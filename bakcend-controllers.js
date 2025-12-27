// POST /api/salary/generate - Generate Salary
router.post('/generate', generateSalary);

// GET /api/salary?employeeId=xxx&month=August&year=2025 - Get Salary Slips
router.get('/', getSalarySlips);

// POST /api/salary/:id/pay - Mark Salary as Paid
router.post('/:id/pay', markSalaryPaid);

/**
 * Generate Salary
 * POST /api/salary/generate
 */
export const generateSalary = async (req, res) => {
  try {
    const { month, year, employeeType, employeeId } = req.body;
    const schoolId = req.schoolId;
    const campusId = req.campusId;
    const userId = req.user.userId;

    // Check permissions
    const user = await User.findById(userId).select('role permissions');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role !== 'school_owner' && 
        (user.role !== 'admin' || !user.permissions?.includes(PERMISSIONS.SALARY_MANAGE))) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate salary slips'
      });
    }

    // Validation
    if (!month || !year || !employeeType) {
      return res.status(400).json({
        success: false,
        message: 'month, year, and employeeType are required'
      });
    }

    const validTypes = ['TEACHER', 'STAFF'];
    if (!validTypes.includes(employeeType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid employeeType. Must be one of: ${validTypes.join(', ')}`
      });
    }

    // Get employees (all or specific)
    let employees = [];
    if (employeeId) {
      if (employeeType === 'TEACHER') {
        const teacher = await Teacher.findOne({
          _id: employeeId,
          schoolId: schoolId,
          campusId: campusId,
          isDeleted: false
        });
        if (teacher) employees = [teacher];
      } else {
        const staff = await Staff.findOne({
          _id: employeeId,
          schoolId: schoolId,
          campusId: campusId,
          isDeleted: false
        });
        if (staff) employees = [staff];
      }
    } else {
      // Get all employees of this type
      if (employeeType === 'TEACHER') {
        employees = await Teacher.find({
          schoolId: schoolId,
          campusId: campusId,
          isDeleted: false
        });
      } else {
        employees = await Staff.find({
          schoolId: schoolId,
          campusId: campusId,
          isDeleted: false
        });
      }
    }

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No employees found'
      });
    }

    // Generate salary slips using transaction
    const { generated, skipped } = await runTransaction(async (session) => {
      let generated = 0;
      let skipped = 0;

      for (const employee of employees) {
        // Check if salary slip already exists
        const existing = await SalarySlip.findOne({
          schoolId: schoolId,
          campusId: campusId,
          employeeType: employeeType,
          employeeId: employee._id,
          month: month,
          year: year
        }).session(session);

        if (existing) {
          skipped++;
          continue;
        }

        // Calculate salary based on attendance
        const basicSalary = employee.salary?.amount || 0;
        
        // Get attendance for the month
        const monthStart = new Date(year, getMonthNumber(month), 1);
        const monthEnd = new Date(year, getMonthNumber(month) + 1, 0, 23, 59, 59);
        
        let attendanceRecords = [];
        if (employeeType === 'TEACHER') {
          attendanceRecords = await TeacherAttendance.find({
            schoolId: schoolId,
            campusId: campusId,
            date: { $gte: monthStart, $lte: monthEnd },
            'records.teacherId': employee._id,
            isFinalized: true
          }).session(session);
        } else {
          attendanceRecords = await StaffAttendance.find({
            schoolId: schoolId,
            campusId: campusId,
            date: { $gte: monthStart, $lte: monthEnd },
            'records.staffId': employee._id,
            isFinalized: true
          }).session(session);
        }

        // Calculate deductions based on attendance
        let deductions = 0;
        let presentDays = 0;
        let absentDays = 0;
        let leaveDays = 0;

        attendanceRecords.forEach(attendance => {
          const record = employeeType === 'TEACHER' 
            ? attendance.records.find(r => r.teacherId.toString() === employee._id.toString())
            : attendance.records.find(r => r.staffId.toString() === employee._id.toString());
          
          if (record) {
            if (record.status === 'PRESENT' || record.status === 'LATE') {
              presentDays++;
            } else if (record.status === 'ABSENT') {
              absentDays++;
            } else if (record.status === 'LEAVE') {
              leaveDays++;
            }
          }
        });

        // Calculate deductions (example: deduct for absent days)
        const dailySalary = basicSalary / 30; // Assuming 30 days per month
        deductions = absentDays * dailySalary;

        const netSalary = Math.max(0, basicSalary - deductions);

        // Create salary slip
        await SalarySlip.create([{
          schoolId: schoolId,
          campusId: campusId,
          employeeType: employeeType,
          employeeId: employee._id,
          month: month,
          year: year,
          basicSalary: basicSalary,
          deductions: deductions,
          netSalary: netSalary,
          status: 'UNPAID'
        }], { session });

        generated++;
      }

      return { generated, skipped };
    });

    res.status(201).json({
      success: true,
      message: 'Salary slips generated successfully',
      data: {
        generated,
        skipped,
        total: employees.length
      }
    });

  } catch (error) {
    console.error('Generate salary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating salary slips',
      error: error.message
    });
  }
};

/**
 * Helper: Get month number from month name
 */
const getMonthNumber = (monthName) => {
  const months = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  return months[monthName] ?? 0;
};

/**
 * Get Salary Slips
 * GET /api/salary?employeeId=xxx&month=August&year=2025
 */
export const getSalarySlips = async (req, res) => {
  try {
    const { employeeId, employeeType, month, year } = req.query;
    const schoolId = req.schoolId;
    const campusId = req.campusId;

    let query = {
      schoolId: schoolId,
      campusId: campusId
    };

    if (employeeId) {
      query.employeeId = employeeId;
    }
    if (employeeType) {
      query.employeeType = employeeType;
    }
    if (month) {
      query.month = month;
    }
    if (year) {
      query.year = parseInt(year);
    }

    const salarySlips = await SalarySlip.find(query)
      .sort({ year: -1, month: -1 });

    // Populate employee details
    const populatedSlips = await Promise.all(salarySlips.map(async (slip) => {
      let employee = null;
      if (slip.employeeType === 'TEACHER') {
        employee = await Teacher.findById(slip.employeeId).select('name');
      } else {
        employee = await Staff.findById(slip.employeeId).select('name designation');
      }
      return {
        ...slip.toObject(),
        employee
      };
    }));

    res.status(200).json({
      success: true,
      message: 'Salary slips retrieved successfully',
      data: populatedSlips
    });

  } catch (error) {
    console.error('Get salary slips error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching salary slips',
      error: error.message
    });
  }
};

/**
 * Mark Salary as Paid
 * POST /api/salary/:id/pay
 */
export const markSalaryPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = req.schoolId;
    const userId = req.user.userId;

    // Check permissions
    const user = await User.findById(userId).select('role permissions');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role !== 'school_owner' && 
        (user.role !== 'admin' || !user.permissions?.includes(PERMISSIONS.SALARY_MANAGE))) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to mark salary as paid'
      });
    }

    // Get salary slip
    const salarySlip = await SalarySlip.findOne({
      _id: id,
      schoolId: schoolId
    });

    if (!salarySlip) {
      return res.status(404).json({
        success: false,
        message: 'Salary slip not found'
      });
    }

    if (salarySlip.status === 'PAID') {
      return res.status(400).json({
        success: false,
        message: 'Salary is already marked as paid'
      });
    }

    // Mark as paid
    salarySlip.status = 'PAID';
    await salarySlip.save();

    res.status(200).json({
      success: true,
      message: 'Salary marked as paid successfully',
      data: salarySlip
    });

  } catch (error) {
    console.error('Mark salary paid error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking salary as paid',
      error: error.message
    });
  }
};

