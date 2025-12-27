import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import {
  createFeeStructure,
  updateFeeStructure,
  getFeeStructure,
  toggleFeeStructure
} from '../controllers/feeStructure.controller.js';
import {
  generateMonthlyFees,
  getStudentFees,
  payFee,
  getFeeReport
} from '../controllers/studentFee.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// ========== FEE STRUCTURE APIs ==========
// POST /api/fees/structure - Create/Update Fee Structure
router.post('/structure', createFeeStructure);

// PUT /api/fees/structure/:id - Update Fee Structure
router.put('/structure/:id', updateFeeStructure);

// GET /api/fees/structure?classId=xxx - Get Fee Structure
router.get('/structure', getFeeStructure);

// PATCH /api/fees/structure/:id/toggle - Toggle Fee Structure
router.patch('/structure/:id/toggle', toggleFeeStructure);

// ========== STUDENT FEE APIs ==========
// POST /api/fees/students/generate - Auto Generate Monthly Fees
router.post('/students/generate', generateMonthlyFees);

// GET /api/fees/students?studentId=xxx - Get Student Fees
router.get('/students', getStudentFees);

// POST /api/fees/students/:feeId/pay - Pay Fee
router.post('/students/:feeId/pay', payFee);

// GET /api/fees/students/report?classId=xxx&month=August - Fee Report
router.get('/students/report', getFeeReport);


/**
 * Create / Update Fee Structure
 * POST /api/fees/structure
 */
export const createFeeStructure = async (req, res) => {
  try {
    const { classId, monthlyFee, admissionFee, examFee } = req.body;
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
        (user.role !== 'admin' || !user.permissions?.includes(PERMISSIONS.FEES_MANAGE))) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to manage fee structures'
      });
    }

    // Validation
    if (!classId || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: 'classId and monthlyFee are required'
      });
    }

    // Verify class exists
    const classDoc = await Class.findOne({
      _id: classId,
      schoolId: schoolId,
      campusId: campusId,
      isDeleted: false
    });

    if (!classDoc) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Check if fee structure already exists for this class
    const existing = await FeeStructure.findOne({
      schoolId: schoolId,
      campusId: campusId,
      classId: classId
    });

    if (existing) {
      // Update existing
      existing.monthlyFee = monthlyFee;
      existing.admissionFee = admissionFee || 0;
      existing.examFee = examFee || 0;
      await existing.save();

      return res.status(200).json({
        success: true,
        message: 'Fee structure updated successfully',
        data: existing
      });
    }

    // Create new
    const feeStructure = await FeeStructure.create({
      schoolId: schoolId,
      campusId: campusId,
      classId: classId,
      monthlyFee: monthlyFee,
      admissionFee: admissionFee || 0,
      examFee: examFee || 0,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Fee structure created successfully',
      data: feeStructure
    });

  } catch (error) {
    console.error('Create fee structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating fee structure',
      error: error.message
    });
  }
};

/**
 * Update Fee Structure
 * PUT /api/fees/structure/:id
 */
export const updateFeeStructure = async (req, res) => {
  try {
    const { id } = req.params;
    const { monthlyFee, admissionFee, examFee, isActive } = req.body;
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
        (user.role !== 'admin' || !user.permissions?.includes(PERMISSIONS.FEES_MANAGE))) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update fee structures'
      });
    }

    // Get fee structure
    const feeStructure = await FeeStructure.findOne({
      _id: id,
      schoolId: schoolId
    });

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: 'Fee structure not found'
      });
    }

    // Update fields
    if (monthlyFee !== undefined) feeStructure.monthlyFee = monthlyFee;
    if (admissionFee !== undefined) feeStructure.admissionFee = admissionFee;
    if (examFee !== undefined) feeStructure.examFee = examFee;
    if (isActive !== undefined) feeStructure.isActive = isActive;

    await feeStructure.save();

    res.status(200).json({
      success: true,
      message: 'Fee structure updated successfully',
      data: feeStructure
    });

  } catch (error) {
    console.error('Update fee structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating fee structure',
      error: error.message
    });
  }
};

/**
 * Get Fee Structure
 * GET /api/fees/structure?classId=xxx
 */
export const getFeeStructure = async (req, res) => {
  try {
    const { classId } = req.query;
    const schoolId = req.schoolId;
    const campusId = req.campusId;

    let query = {
      schoolId: schoolId,
      campusId: campusId
    };

    if (classId) {
      query.classId = classId;
    }

    const feeStructures = await FeeStructure.find(query)
      .populate('classId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Fee structures retrieved successfully',
      data: feeStructures
    });

  } catch (error) {
    console.error('Get fee structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching fee structures',
      error: error.message
    });
  }
};

/**
 * Toggle Fee Structure (Activate/Deactivate)
 * PATCH /api/fees/structure/:id/toggle
 */
export const toggleFeeStructure = async (req, res) => {
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
        (user.role !== 'admin' || !user.permissions?.includes(PERMISSIONS.FEES_MANAGE))) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to toggle fee structures'
      });
    }

    // Get fee structure
    const feeStructure = await FeeStructure.findOne({
      _id: id,
      schoolId: schoolId
    });

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: 'Fee structure not found'
      });
    }

    // Toggle
    feeStructure.isActive = !feeStructure.isActive;
    await feeStructure.save();

    res.status(200).json({
      success: true,
      message: `Fee structure ${feeStructure.isActive ? 'activated' : 'deactivated'} successfully`,
      data: feeStructure
    });

  } catch (error) {
    console.error('Toggle fee structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling fee structure',
      error: error.message
    });
  }
};

/**
 * Auto Generate Monthly Fees
 * POST /api/fees/students/generate
 */
export const generateMonthlyFees = async (req, res) => {
  try {
    const { month, year, classId, sessionId } = req.body;
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
        (user.role !== 'admin' || !user.permissions?.includes(PERMISSIONS.FEES_MANAGE))) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate fees'
      });
    }

    // Validation
    if (!month || !year || !sessionId) {
      return res.status(400).json({
        success: false,
        message: 'month, year, and sessionId are required'
      });
    }

    // Get students (all or by class)
    let studentQuery = {
      schoolId: schoolId,
      campusId: campusId,
      isDeleted: false
    };
    if (classId) {
      studentQuery.classId = classId;
    }

    const students = await Student.find(studentQuery);

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found'
      });
    }

    // Generate fees using transaction
    const { generated, skipped } = await runTransaction(async (session) => {
      let generated = 0;
      let skipped = 0;

      for (const student of students) {
        // Check if fee already exists
        const existing = await StudentFee.findOne({
          schoolId: schoolId,
          campusId: campusId,
          studentId: student._id,
          sessionId: sessionId,
          month: month,
          year: year
        }).session(session);

        if (existing) {
          skipped++;
          continue;
        }

        // Get fee structure for student's class
        const feeStructure = await FeeStructure.findOne({
          schoolId: schoolId,
          campusId: campusId,
          classId: student.classId,
          isActive: true
        }).session(session);

        if (!feeStructure) {
          skipped++;
          continue;
        }

        // Create fee record
        await StudentFee.create([{
          schoolId: schoolId,
          campusId: campusId,
          studentId: student._id,
          sessionId: sessionId,
          month: month,
          year: year,
          amount: feeStructure.monthlyFee,
          paidAmount: 0,
          status: 'PENDING',
          dueDate: new Date(year, getMonthNumber(month) + 1, 1) // First day of next month
        }], { session });

        generated++;
      }

      return { generated, skipped };
    });

    res.status(201).json({
      success: true,
      message: 'Monthly fees generated successfully',
      data: {
        generated,
        skipped,
        total: students.length
      }
    });

  } catch (error) {
    console.error('Generate monthly fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating monthly fees',
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
 * Get Student Fees
 * GET /api/fees/students?studentId=xxx
 */
export const getStudentFees = async (req, res) => {
  try {
    const { studentId, sessionId, month, year } = req.query;
    const schoolId = req.schoolId;
    const campusId = req.campusId;

    let query = {
      schoolId: schoolId,
      campusId: campusId
    };

    if (studentId) {
      query.studentId = studentId;
    }
    if (sessionId) {
      query.sessionId = sessionId;
    }
    if (month) {
      query.month = month;
    }
    if (year) {
      query.year = parseInt(year);
    }

    const fees = await StudentFee.find(query)
      .populate('studentId', 'name rollNumber')
      .populate('sessionId', 'name')
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      message: 'Student fees retrieved successfully',
      data: fees
    });

  } catch (error) {
    console.error('Get student fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student fees',
      error: error.message
    });
  }
};

/**
 * Pay Fee
 * POST /api/fees/students/:feeId/pay
 */
export const payFee = async (req, res) => {
  try {
    const { feeId } = req.params;
    const { paidAmount } = req.body;
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
        (user.role !== 'admin' || !user.permissions?.includes(PERMISSIONS.FEES_MANAGE))) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to process payments'
      });
    }

    // Validation
    if (!paidAmount || paidAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'paidAmount must be greater than 0'
      });
    }

    // Get fee
    const fee = await StudentFee.findOne({
      _id: feeId,
      schoolId: schoolId
    });

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    // Update payment
    const newPaidAmount = fee.paidAmount + paidAmount;
    fee.paidAmount = newPaidAmount;
    fee.paidOn = new Date();

    // Update status
    if (newPaidAmount >= fee.amount) {
      fee.status = 'PAID';
    } else if (newPaidAmount > 0) {
      fee.status = 'PARTIAL';
    }

    await fee.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      data: fee
    });

  } catch (error) {
    console.error('Pay fee error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing payment',
      error: error.message
    });
  }
};

/**
 * Fee Report
 * GET /api/fees/students/report?classId=xxx&month=August
 */
export const getFeeReport = async (req, res) => {
  try {
    const { classId, month, year, sessionId } = req.query;
    const schoolId = req.schoolId;
    const campusId = req.campusId;

    let query = {
      schoolId: schoolId,
      campusId: campusId
    };

    if (classId) {
      // Get students in this class
      const students = await Student.find({
        classId: classId,
        schoolId: schoolId,
        campusId: campusId,
        isDeleted: false
      }).select('_id');
      query.studentId = { $in: students.map(s => s._id) };
    }
    if (month) {
      query.month = month;
    }
    if (year) {
      query.year = parseInt(year);
    }
    if (sessionId) {
      query.sessionId = sessionId;
    }

    const fees = await StudentFee.find(query)
      .populate('studentId', 'name rollNumber')
      .populate('sessionId', 'name')
      .sort({ createdAt: -1 });

    // Calculate statistics
    const total = fees.length;
    const paid = fees.filter(f => f.status === 'PAID').length;
    const partial = fees.filter(f => f.status === 'PARTIAL').length;
    const pending = fees.filter(f => f.status === 'PENDING').length;
    const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
    const totalPaid = fees.reduce((sum, f) => sum + f.paidAmount, 0);
    const totalPending = totalAmount - totalPaid;

    res.status(200).json({
      success: true,
      message: 'Fee report retrieved successfully',
      data: {
        fees,
        statistics: {
          total,
          paid,
          partial,
          pending,
          totalAmount,
          totalPaid,
          totalPending
        }
      }
    });

  } catch (error) {
    console.error('Get fee report error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching fee report',
      error: error.message
    });
  }
};