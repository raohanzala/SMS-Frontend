
// GET /api/school-owners - Get all school owners with filters and pagination
router.get('/', getAllOwners);

// GET /api/school-owners/:id - Get single school owner by ID with details
router.get('/:id', getSchoolOwnerById);

/**
 * Get All School Owners
 * GET /api/school-owners
 * 
 * Only accessible by super_admin
 * 
 * Query params:
 * - page: pagination page (default: 1)
 * - limit: items per page (default: 20)
 * - search: search by name or email
 * - status: filter by status (ACTIVE, SUSPENDED)
 * - hasSchool: filter by whether owner has a school (true/false)
 */
export const getAllOwners = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      hasSchool
    } = req.query;

    // Build filter
    const filter = {};

    // Search filter (name or email via user)
    if (search) {
      // Find users matching email
      const users = await User.find({
        role: 'school_owner',
        email: { $regex: search, $options: 'i' }
      }).select('_id');

      const userIds = users.map(u => u._id);
      
      // Find owners matching name
      const ownersByName = await SchoolOwner.find({
        name: { $regex: search, $options: 'i' }
      }).select('user');

      const ownerUserIds = ownersByName.map(o => o.user);
      
      // Combine all matching user IDs (keep as ObjectIds)
      const allUserIds = [...new Set([...userIds, ...ownerUserIds])];
      
      if (allUserIds.length > 0) {
        filter.user = { $in: allUserIds };
      } else {
        // No matches, return empty result
        filter.user = { $in: [] };
      }
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Has school filter
    if (hasSchool === 'true') {
      filter.schoolId = { $ne: null };
    } else if (hasSchool === 'false') {
      filter.schoolId = null;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Validate pagination
    if (pageNum < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page must be greater than 0'
      });
    }
    if (limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 100'
      });
    }

    // Get total count
    const totalOwners = await SchoolOwner.countDocuments(filter);

    // Fetch school owners with pagination
    const owners = await SchoolOwner.find(filter)
      .populate({
        path: 'user',
        select: 'email role status isFirstLogin createdAt',
        populate: {
          path: 'schoolId',
          select: 'name code isActive'
        }
      })
      .populate({
        path: 'schoolId',
        select: 'name code isActive ownerId createdAt',
        populate: {
          path: 'ownerId',
          select: 'email role'
        }
      })
      .populate('campusId', 'name')
      .sort({ createdAt: -1 }) // Latest first
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Calculate pagination info
    const totalPages = Math.ceil(totalOwners / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.status(200).json({
      success: true,
      message: 'School owners retrieved successfully',
      data: {
        owners,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalOwners,
          limit: limitNum,
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Get all owners error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving school owners',
      error: error.message
    });
  }
};

/**
 * Get School Owner by ID with Details
 * GET /api/school-owners/:id
 * 
 * Only accessible by super_admin
 * 
 * Returns detailed information including:
 * - Owner profile details
 * - User account details
 * - School details (if exists)
 * - Campus details (if exists)
 * - Subscription details (if exists)
 */
export const getSchoolOwnerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'School owner ID is required'
      });
    }

    // Fetch school owner with all related details
    const owner = await SchoolOwner.findById(id)
      .populate({
        path: 'user',
        select: 'email role status isFirstLogin permissions createdAt updatedAt',
        populate: [
          {
            path: 'schoolId',
            select: 'name code isActive ownerId createdAt updatedAt',
            populate: {
              path: 'ownerId',
              select: 'email role'
            }
          }
        ]
      })
      .populate({
        path: 'schoolId',
        select: 'name code isActive ownerId createdAt updatedAt',
        populate: {
          path: 'ownerId',
          select: 'email role name'
        }
      })
      .populate('campusId', 'name address')
      .lean();

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'School owner not found'
      });
    }

    // If owner has a school, get additional school details
    let schoolDetails = null;
    if (owner.schoolId) {
      schoolDetails = await School.findById(owner.schoolId)
        .populate('ownerId', 'email role')
        .lean();
    }

    // Get subscription details if school exists
    let subscriptionDetails = null;
    if (owner.schoolId) {
      try {
        subscriptionDetails = await Subscription.findOne({
          schoolId: owner.schoolId
        })
          .populate('planId', 'name price features')
          .lean();
      } catch (err) {
        // Subscription model might not exist or have issues
        console.error('Error fetching subscription:', err);
      }
    }

    // Get campuses count if school exists
    let campusesCount = 0;
    if (owner.schoolId) {
      try {
        campusesCount = await Campus.countDocuments({
          schoolId: owner.schoolId,
          isDeleted: false
        });
      } catch (err) {
        console.error('Error counting campuses:', err);
      }
    }

    // Combine all details
    const ownerDetails = {
      ...owner,
      school: schoolDetails,
      subscription: subscriptionDetails,
      campusesCount
    };

    res.status(200).json({
      success: true,
      message: 'School owner retrieved successfully',
      data: ownerDetails
    });

  } catch (error) {
    console.error('Get school owner by ID error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid school owner ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error retrieving school owner',
      error: error.message
    });
  }
};