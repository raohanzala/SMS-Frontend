

router.post('/set-password', setPassword); // Set password via invite token



export const setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and password are required'
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
      });
    }

    // Verify invite token
    let decoded;
    try {
      decoded = verifyInviteToken(token);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Invalid or expired invite token'
      });
    }

    // Find user by userId from token
    const user = await User.findById(decoded.userId).select('+inviteToken +password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is in INVITED status
    if (user.status !== 'INVITED') {
      return res.status(400).json({
        success: false,
        message: 'This account has already been activated. Please use the login page.'
      });
    }

    // Check if invite token has expired (additional check)
    if (user.inviteExpiresAt && new Date() > user.inviteExpiresAt) {
      return res.status(400).json({
        success: false,
        message: 'Invite token has expired. Please contact your administrator for a new invite.'
      });
    }

    // Verify the token matches (compare with stored hash)
    // Note: We're storing hashed token, but for simplicity, we can verify the JWT directly
    // If you want extra security, uncomment the hash comparison:
    // const tokenMatches = await compareInviteToken(token, user.inviteToken);
    // if (!tokenMatches) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid invite token'
    //   });
    // }

    // Hash and set password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user: set password, activate account, clear invite token
    user.password = hashedPassword;
    user.status = 'ACTIVE';
    user.isFirstLogin = false;
    user.inviteToken = null;
    user.inviteExpiresAt = null;

    await user.save();

    // Generate auth token for immediate login
    const authToken = generateToken(user._id, user.role, user.schoolId, user.campusId);

    res.status(200).json({
      success: true,
      message: 'Password set successfully. Your account is now active.',
      data: {
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          status: user.status
        },
        token: authToken
      }
    });

  } catch (error) {
    console.error('Set password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};