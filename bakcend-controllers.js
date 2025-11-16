import { Timetable } from '../models/timetable.model.js';
import { Class } from '../models/class.model.js';
import { Teacher } from '../models/teacher.model.js';
import { Student } from '../models/student.model.js';
import { Parent } from '../models/parent.model.js';
import { User } from '../models/user.model.js';
import mongoose from 'mongoose';

// Helper function to format timetable as weekly grid
const formatWeeklyGrid = (timetableEntries) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const grid = {};
  
  days.forEach(day => {
    grid[day] = [];
  });

  timetableEntries.forEach(entry => {
    if (!grid[entry.day]) grid[entry.day] = [];
    grid[entry.day].push(entry);
  });

  // Sort periods for each day
  days.forEach(day => {
    grid[day].sort((a, b) => a.period - b.period);
  });

  return grid;
};

// POST /timetable - Create a period for a class
export const createTimetable = async (req, res) => {
  try {
    const {
      classId,
      day,
      period,
      startTime,
      endTime,
      subject,
      teacherId,
      room,
      notes,
      isSubstitute,
      originalTeacherId
    } = req.body;

    // Validation
    if (!classId || !day || !period || !startTime || !endTime || !subject || !teacherId) {
      return res.status(400).json({
        success: false,
        message: 'Class, day, period, startTime, endTime, subject, and teacher are required'
      });
    }

    // Validate day
    const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (!validDays.includes(day)) {
      return res.status(400).json({
        success: false,
        message: `Invalid day. Must be one of: ${validDays.join(', ')}`
      });
    }

    // Validate period
    if (!Number.isInteger(period) || period < 1) {
      return res.status(400).json({
        success: false,
        message: 'Period must be a positive integer'
      });
    }

    // Validate class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Validate subject exists in class
    const subjectExists = classExists.subjects.some(
      s => s.name.toLowerCase().trim() === subject.toLowerCase().trim()
    );
    if (!subjectExists) {
      return res.status(400).json({
        success: false,
        message: `Subject "${subject}" not found in class "${classExists.name}"`
      });
    }

    // Validate teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Validate original teacher if substitute
    if (isSubstitute && originalTeacherId) {
      const originalTeacher = await Teacher.findById(originalTeacherId);
      if (!originalTeacher) {
        return res.status(404).json({
          success: false,
          message: 'Original teacher not found'
        });
      }
    }

    // Check for conflicts: Class cannot have two teachers at the same period
    const classConflict = await Timetable.findOne({
      class: classId,
      day,
      period
    });
    if (classConflict) {
      return res.status(400).json({
        success: false,
        message: `Class already has a teacher assigned for ${day}, Period ${period}`
      });
    }

    // Check for conflicts: Teacher cannot have two classes at the same time
    const teacherConflict = await Timetable.findOne({
      teacher: teacherId,
      day,
      period
    });
    if (teacherConflict) {
      return res.status(400).json({
        success: false,
        message: `Teacher is already assigned to another class on ${day}, Period ${period}`
      });
    }

    // Check for conflicts: Room cannot be double-booked (if room is provided)
    if (room && room.trim()) {
      const roomConflict = await Timetable.findOne({
        room: room.trim(),
        day,
        period
      });
      if (roomConflict) {
        return res.status(400).json({
          success: false,
          message: `Room "${room}" is already booked for ${day}, Period ${period}`
        });
      }
    }

    // Create timetable entry
    const timetable = await Timetable.create({
      class: classId,
      day,
      period,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      subject: subject.trim(),
      teacher: teacherId,
      room: room?.trim() || undefined,
      notes: notes || '',
      isSubstitute: isSubstitute || false,
      originalTeacher: originalTeacherId || undefined
    });

    const populatedTimetable = await Timetable.findById(timetable._id)
      .populate('class', 'name')
      .populate('teacher', 'name')
      .populate('originalTeacher', 'name');

    res.status(201).json({
      success: true,
      message: 'Timetable entry created successfully',
      data: {
        timetable: populatedTimetable
      }
    });

  } catch (error) {
    console.error('Create timetable error:', error);
    
    // Handle unique constraint violations
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Conflict detected: ${field === 'room' ? 'Room' : field === 'teacher' ? 'Teacher' : 'Class'} already has an entry for this time slot`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating timetable',
      error: error.message
    });
  }
};

// GET /timetable/class/:classId - Get full weekly timetable for a class
export const getClassTimetable = async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      return res.status(400).json({
        success: false,
        message: 'Class ID is required'
      });
    }

    // Validate class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Get all timetable entries for this class
    const timetableEntries = await Timetable.find({ class: classId })
      .populate('teacher', 'name')
      .populate('originalTeacher', 'name')
      .sort({ day: 1, period: 1 });

    // Format as weekly grid
    const weeklyGrid = formatWeeklyGrid(timetableEntries);

    res.status(200).json({
      success: true,
      message: 'Class timetable retrieved successfully',
      data: {
        class: {
          _id: classExists._id,
          name: classExists.name
        },
        timetable: weeklyGrid,
        raw: timetableEntries // Also provide raw data for flexibility
      }
    });

  } catch (error) {
    console.error('Get class timetable error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving class timetable',
      error: error.message
    });
  }
};

// GET /timetable/student/:studentId - Get student timetable (same as class timetable)
export const getStudentTimetable = async (req, res) => {
  try {
    const { studentId } = req.params;
    const userRole = req.user?.role;
    const userId = req.user?.userId;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }

    // Find student and get their class
    const student = await Student.findById(studentId)
      .populate('class', 'name');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Authorization check for parents: they can only view their own children's timetables
    if (userRole === 'parent') {
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User authentication required'
        });
      }

      // Get parent profile from userRef
      const user = await User.findById(userId);
      if (!user || !user.userRef) {
        return res.status(403).json({
          success: false,
          message: 'Parent profile not found'
        });
      }

      const parent = await Parent.findById(user.userRef);
      if (!parent) {
        return res.status(403).json({
          success: false,
          message: 'Parent profile not found'
        });
      }

      // Check if student is a child of this parent
      const isChild = parent.children.some(
        childId => childId.toString() === studentId
      );

      if (!isChild) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to view this student\'s timetable'
        });
      }
    }

    // Authorization check for students: they can only view their own timetable
    if (userRole === 'student') {
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User authentication required'
        });
      }

      const user = await User.findById(userId);
      if (!user || !user.userRef || user.userRef.toString() !== studentId) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to view this student\'s timetable'
        });
      }
    }

    if (!student.class) {
      return res.status(400).json({
        success: false,
        message: 'Student is not assigned to a class'
      });
    }

    // Get class timetable (reuse getClassTimetable logic)
    const timetableEntries = await Timetable.find({ class: student.class._id })
      .populate('teacher', 'name')
      .populate('originalTeacher', 'name')
      .sort({ day: 1, period: 1 });

    const weeklyGrid = formatWeeklyGrid(timetableEntries);

    res.status(200).json({
      success: true,
      message: 'Student timetable retrieved successfully',
      data: {
        student: {
          _id: student._id,
          name: student.name,
          rollNumber: student.rollNumber
        },
        class: {
          _id: student.class._id,
          name: student.class.name
        },
        timetable: weeklyGrid,
        raw: timetableEntries
      }
    });

  } catch (error) {
    console.error('Get student timetable error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving student timetable',
      error: error.message
    });
  }
};

// GET /timetable/teacher/:teacherId - Get teacher timetable
export const getTeacherTimetable = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        message: 'Teacher ID is required'
      });
    }

    // Validate teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Get all timetable entries for this teacher
    const timetableEntries = await Timetable.find({ teacher: teacherId })
      .populate('class', 'name')
      .populate('originalTeacher', 'name')
      .sort({ day: 1, period: 1 });

    // Format as weekly grid
    const weeklyGrid = formatWeeklyGrid(timetableEntries);

    // Calculate free periods (optional enhancement)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const freePeriods = {};
    const maxPeriod = 8; // Assuming max 8 periods per day

    days.forEach(day => {
      freePeriods[day] = [];
      const bookedPeriods = (weeklyGrid[day] || []).map(e => e.period);
      for (let p = 1; p <= maxPeriod; p++) {
        if (!bookedPeriods.includes(p)) {
          freePeriods[day].push(p);
        }
      }
    });

    // Separate regular and substitute classes
    const regularClasses = timetableEntries.filter(e => !e.isSubstitute);
    const substituteClasses = timetableEntries.filter(e => e.isSubstitute);

    res.status(200).json({
      success: true,
      message: 'Teacher timetable retrieved successfully',
      data: {
        teacher: {
          _id: teacher._id,
          name: teacher.name
        },
        timetable: weeklyGrid,
        freePeriods,
        regularClasses,
        substituteClasses,
        raw: timetableEntries
      }
    });

  } catch (error) {
    console.error('Get teacher timetable error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving teacher timetable',
      error: error.message
    });
  }
};

// GET /timetable - Get all timetables (with optional filters)
export const getAllTimetables = async (req, res) => {
  try {
    const {
      classId,
      teacherId,
      day,
      period,
      room,
      page = 1,
      limit = 50
    } = req.query;

    const filter = {};
    if (classId) filter.class = classId;
    if (teacherId) filter.teacher = teacherId;
    if (day) filter.day = day;
    if (period) filter.period = parseInt(period, 10);
    if (room) filter.room = room;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const timetables = await Timetable.find(filter)
      .populate('class', 'name')
      .populate('teacher', 'name')
      .populate('originalTeacher', 'name')
      .sort({ day: 1, period: 1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Timetable.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'Timetables retrieved successfully',
      data: {
        timetables,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalItems: total,
          itemsPerPage: limitNum
        }
      }
    });

  } catch (error) {
    console.error('Get all timetables error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving timetables',
      error: error.message
    });
  }
};

// PUT /timetable/:id - Update a timetable entry
export const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      classId,
      day,
      period,
      startTime,
      endTime,
      subject,
      teacherId,
      room,
      notes,
      isSubstitute,
      originalTeacherId
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Timetable ID is required'
      });
    }

    // Find existing timetable
    const existingTimetable = await Timetable.findById(id);
    if (!existingTimetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }

    // Build update object
    const updateData = {};
    if (classId !== undefined) {
      const classExists = await Class.findById(classId);
      if (!classExists) {
        return res.status(404).json({
          success: false,
          message: 'Class not found'
        });
      }
      updateData.class = classId;
    }
    if (day !== undefined) {
      const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if (!validDays.includes(day)) {
        return res.status(400).json({
          success: false,
          message: `Invalid day. Must be one of: ${validDays.join(', ')}`
        });
      }
      updateData.day = day;
    }
    if (period !== undefined) {
      if (!Number.isInteger(period) || period < 1) {
        return res.status(400).json({
          success: false,
          message: 'Period must be a positive integer'
        });
      }
      updateData.period = period;
    }
    if (startTime !== undefined) updateData.startTime = startTime.trim();
    if (endTime !== undefined) updateData.endTime = endTime.trim();
    if (subject !== undefined) {
      // Validate subject exists in class
      const targetClassId = classId || existingTimetable.class;
      const targetClass = await Class.findById(targetClassId);
      if (!targetClass) {
        return res.status(404).json({
          success: false,
          message: 'Class not found for subject validation'
        });
      }
      const subjectExists = targetClass.subjects.some(
        s => s.name.toLowerCase().trim() === subject.toLowerCase().trim()
      );
      if (!subjectExists) {
        return res.status(400).json({
          success: false,
          message: `Subject "${subject}" not found in class`
        });
      }
      updateData.subject = subject.trim();
    }
    if (teacherId !== undefined) {
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found'
        });
      }
      updateData.teacher = teacherId;
    }
    if (room !== undefined) {
      updateData.room = room?.trim() || undefined;
    }
    if (notes !== undefined) updateData.notes = notes;
    if (isSubstitute !== undefined) updateData.isSubstitute = isSubstitute;
    if (originalTeacherId !== undefined) {
      if (originalTeacherId) {
        const originalTeacher = await Teacher.findById(originalTeacherId);
        if (!originalTeacher) {
          return res.status(404).json({
            success: false,
            message: 'Original teacher not found'
          });
        }
      }
      updateData.originalTeacher = originalTeacherId || undefined;
    }

    // Check for conflicts (excluding current entry)
    const finalClass = updateData.class || existingTimetable.class;
    const finalDay = updateData.day || existingTimetable.day;
    const finalPeriod = updateData.period || existingTimetable.period;
    const finalTeacher = updateData.teacher || existingTimetable.teacher;
    const finalRoom = updateData.room !== undefined ? updateData.room : existingTimetable.room;

    // Check class conflict
    const classConflict = await Timetable.findOne({
      _id: { $ne: id },
      class: finalClass,
      day: finalDay,
      period: finalPeriod
    });
    if (classConflict) {
      return res.status(400).json({
        success: false,
        message: `Class already has a teacher assigned for ${finalDay}, Period ${finalPeriod}`
      });
    }

    // Check teacher conflict
    const teacherConflict = await Timetable.findOne({
      _id: { $ne: id },
      teacher: finalTeacher,
      day: finalDay,
      period: finalPeriod
    });
    if (teacherConflict) {
      return res.status(400).json({
        success: false,
        message: `Teacher is already assigned to another class on ${finalDay}, Period ${finalPeriod}`
      });
    }

    // Check room conflict (if room is provided)
    if (finalRoom && finalRoom.trim()) {
      const roomConflict = await Timetable.findOne({
        _id: { $ne: id },
        room: finalRoom.trim(),
        day: finalDay,
        period: finalPeriod
      });
      if (roomConflict) {
        return res.status(400).json({
          success: false,
          message: `Room "${finalRoom}" is already booked for ${finalDay}, Period ${finalPeriod}`
        });
      }
    }

    // Update timetable
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('class', 'name')
      .populate('teacher', 'name')
      .populate('originalTeacher', 'name');

    res.status(200).json({
      success: true,
      message: 'Timetable updated successfully',
      data: {
        timetable: updatedTimetable
      }
    });

  } catch (error) {
    console.error('Update timetable error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Conflict detected: ${field === 'room' ? 'Room' : field === 'teacher' ? 'Teacher' : 'Class'} already has an entry for this time slot`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating timetable',
      error: error.message
    });
  }
};

// DELETE /timetable/:id - Delete a timetable entry
export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Timetable ID is required'
      });
    }

    const timetable = await Timetable.findByIdAndDelete(id);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Timetable entry deleted successfully',
      data: {
        deletedTimetable: timetable
      }
    });

  } catch (error) {
    console.error('Delete timetable error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting timetable',
      error: error.message
    });
  }
};

// GET /timetable/:id - Get single timetable entry by ID
export const getTimetableById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Timetable ID is required'
      });
    }

    const timetable = await Timetable.findById(id)
      .populate('class', 'name')
      .populate('teacher', 'name')
      .populate('originalTeacher', 'name');

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Timetable retrieved successfully',
      data: {
        timetable
      }
    });

  } catch (error) {
    console.error('Get timetable by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving timetable',
      error: error.message
    });
  }
};
