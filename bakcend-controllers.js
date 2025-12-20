export const signupOwner = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists (globally, since schoolId can be null initially)
    const existingUser = await User.findOne({ 
      email: normalizedEmail,
      schoolId: null // Only check users without a school (new owners)
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check if owner with this email already exists
    const existingOwner = await Owner.findOne({ email: normalizedEmail });
    if (existingOwner) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create owner user without schoolId (will be set when school is created)
    const user = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      role: 'school_owner',
      schoolId: null, // Will be set when school is created
      status: 'ACTIVE',
      isFirstLogin: true
    });

    // Create Owner profile with name
    const owner = await Owner.create({
      user: user._id,
      name: name.trim(),
      email: normalizedEmail,
      phone: phone || '',
      address: address || '',
      profileImage: req.file?.path || '',
      schoolId: null, // Will be set when school is created
      status: 'ACTIVE'
    });

    // Update User with profile reference
    user.profile = owner._id;
    user.roleProfile = 'Owner'; // Note: You may need to add 'Owner' to roleProfile enum
    await user.save();

    // Generate token without schoolId (will be updated after school creation)
    const token = generateToken(user._id, user.role, null);

    res.status(201).json({
      success: true,
      message: 'Owner account created successfully. Please create your school.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          isFirstLogin: true
        },
        owner: {
          id: owner._id,
          name: owner.name,
          email: owner.email
        },
        token
      }
    });

  } catch (error) {
    console.error('Signup owner error:', error);
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered'
        });
      }
      if (error.keyPattern?.user) {
        return res.status(409).json({
          success: false,
          message: 'Owner profile already exists for this user'
        });
      }
    }
    res.status(500).json({
      success: false,
      message: 'Signup failed',
      error: error.message
    });
  }
};


export const createSchool = async (req, res) => {
  try {
    const { name, code } = req.body;
    const ownerId = req.user.userId; // Get owner ID from JWT

    // 1. Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'School name is required'
      });
    }

    // 2. Verify user is a school owner
    if (req.user.role !== 'school_owner') {
      return res.status(403).json({
        success: false,
        message: 'Only school owners can create schools'
      });
    }

    // 3. Check if owner already has a school (SaaS rule: one school per owner)
    const existingSchool = await School.findOne({ ownerId });
    if (existingSchool) {
      return res.status(409).json({
        success: false,
        message: 'You already have a school. Each owner can only create one school.'
      });
    }

    // 4. Verify owner exists
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found'
      });
    }

    // 5. Generate unique school code if not provided
    let schoolCode = code;
    if (!schoolCode || !schoolCode.trim()) {
      // Auto-generate from school name
      schoolCode = name
        .replace(/\s+/g, '')
        .substring(0, 6)
        .toUpperCase() + Math.floor(100 + Math.random() * 900);
    } else {
      schoolCode = schoolCode.trim().toUpperCase();
    }

    // 6. Ensure code uniqueness
    const codeExists = await School.findOne({ code: schoolCode });
    if (codeExists) {
      return res.status(409).json({
        success: false,
        message: 'School code already exists. Please choose a different code.'
      });
    }

    // 7. Create school
    const school = await School.create({
      name: name.trim(),
      code: schoolCode,
      ownerId: ownerId,
      plan: 'FREE',
      isActive: true,
      subscription: {
        status: 'active'
      }
    });

    // 8. Attach schoolId to owner user
    owner.schoolId = school._id;
    owner.isFirstLogin = false; // Owner has completed onboarding
    await owner.save();

    // 9. Update Owner profile with schoolId
    const ownerProfile = await Owner.findOne({ user: ownerId });
    if (ownerProfile) {
      ownerProfile.schoolId = school._id;
      await ownerProfile.save();
    }

    // 10. Generate new token with schoolId included
    const token = jwt.sign(
      { userId: owner._id, role: owner.role, schoolId: school._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Populate owner profile for response
    const ownerWithProfile = await Owner.findOne({ user: ownerId })
      .select('name email phone address profileImage');

    res.status(201).json({
      success: true,
      message: 'School created successfully',
      data: {
        school: {
          _id: school._id,
          name: school.name,
          code: school.code,
          plan: school.plan,
          isActive: school.isActive,
          ownerId: school.ownerId
        },
        owner: {
          _id: owner._id,
          email: owner.email,
          role: owner.role,
          profile: ownerWithProfile ? {
            name: ownerWithProfile.name,
            email: ownerWithProfile.email,
            phone: ownerWithProfile.phone,
            address: ownerWithProfile.address
          } : null
        },
        token // Return new token with schoolId
      }
    });

  } catch (error) {
    console.error('Create school error:', error);
    if (error.code === 11000) {
      if (error.keyPattern?.code) {
        return res.status(409).json({
          success: false,
          message: 'School code already exists'
        });
      }
      if (error.keyPattern?.ownerId) {
        return res.status(409).json({
          success: false,
          message: 'You already have a school'
        });
      }
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating school',
      error: error.message
    });
  }
};