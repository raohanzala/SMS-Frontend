import { Session } from '../models/session.model.js';


router.get('/', authenticate, getAllSessions);

// Add new session
router.post('/', authenticate, addSession);

// Update session
router.put('/:sessionId', authenticate, updateSession);

// Delete session
router.delete('/:sessionId', authenticate, deleteSession);

export default router;


// Get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const sessions = await Session.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('name startDate endDate isActive createdAt updatedAt');

    const totalSessions = await Session.countDocuments(filter);
    const totalPages = Math.ceil(totalSessions / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      message: 'Sessions retrieved successfully',
      data: {
        sessions,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalSessions,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get all sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving sessions',
      error: error.message
    });
  }
};

// Add new session
export const addSession = async (req, res) => {
  try {
    const { name, startDate, endDate, isActive } = req.body;

    // Basic validation
    if (!name || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Session name, start date, and end date are required'
      });
    }

    // Validate date format
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Please provide valid dates.'
      });
    }

    // Validate that end date is after start date
    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Check if session name already exists
    const existingSession = await Session.findOne({ name: name.trim() });
    if (existingSession) {
      return res.status(409).json({
        success: false,
        message: 'Session with this name already exists'
      });
    }

    // If setting this session as active, deactivate all other sessions
    if (isActive === true) {
      await Session.updateMany(
        { isActive: true },
        { $set: { isActive: false } }
      );
    }

    // Create session
    const newSession = await Session.create({
      name: name.trim(),
      startDate: start,
      endDate: end,
      isActive: isActive || false
    });

    res.status(201).json({
      success: true,
      message: 'Session created successfully',
      data: newSession
    });

  } catch (error) {
    console.error('Add session error:', error);
    if (error.code === 11000 && error.keyPattern?.name) {
      return res.status(400).json({
        success: false,
        message: 'Session name already exists. Please use a different name.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating session',
      error: error.message
    });
  }
};

// Update session
export const updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { name, startDate, endDate, isActive } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    // Check if session exists
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Build update data
    const updateData = {};

    if (name !== undefined) {
      // Check if new name conflicts with existing session
      if (name.trim() !== session.name) {
        const existingSession = await Session.findOne({ name: name.trim() });
        if (existingSession) {
          return res.status(409).json({
            success: false,
            message: 'Session with this name already exists'
          });
        }
      }
      updateData.name = name.trim();
    }

    if (startDate !== undefined) {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid start date format'
        });
      }
      updateData.startDate = start;
    }

    if (endDate !== undefined) {
      const end = new Date(endDate);
      if (isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid end date format'
        });
      }
      updateData.endDate = end;
    }

    // Validate date range if both dates are being updated
    if (updateData.startDate && updateData.endDate) {
      if (updateData.endDate <= updateData.startDate) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date'
        });
      }
    } else if (updateData.startDate && session.endDate) {
      if (session.endDate <= updateData.startDate) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date'
        });
      }
    } else if (updateData.endDate && session.startDate) {
      if (updateData.endDate <= session.startDate) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date'
        });
      }
    }

    // If setting this session as active, deactivate all other sessions
    if (isActive === true && !session.isActive) {
      await Session.updateMany(
        { _id: { $ne: sessionId }, isActive: true },
        { $set: { isActive: false } }
      );
      updateData.isActive = true;
    } else if (isActive === false) {
      updateData.isActive = false;
    }

    // Update session
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Session updated successfully',
      data: updatedSession
    });

  } catch (error) {
    console.error('Update session error:', error);
    if (error.code === 11000 && error.keyPattern?.name) {
      return res.status(400).json({
        success: false,
        message: 'Session name already exists. Please use a different name.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating session',
      error: error.message
    });
  }
};

// Delete session
export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Check if session is active
    if (session.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete an active session. Please deactivate it first.'
      });
    }

    // TODO: Check if session has associated students or other data
    // For now, we'll allow deletion but this should be checked
    // const studentsWithSession = await Student.countDocuments({ session: sessionId });
    // if (studentsWithSession > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Cannot delete session. ${studentsWithSession} student(s) are associated with this session.`
    //   });
    // }

    await Session.findByIdAndDelete(sessionId);

    res.status(200).json({
      success: true,
      message: 'Session deleted successfully'
    });

  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting session',
      error: error.message
    });
  }
};

