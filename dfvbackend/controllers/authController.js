const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken'); // Add at top

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role: 'user', // default role
    };

    if (role === 'admin') {
      userData.requestedAdmin = true;
      userData.isApprovedAdmin = false;
    }

    const user = await User.create(userData);

    const token = generateToken(user._id);
    if (!token) return res.status(500).json({ msg: 'Token generation failed' });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        requestedAdmin: user.requestedAdmin || false,
        isApprovedAdmin: user.isApprovedAdmin || false,
      },
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ user: { id: user._id, name: user.name,role: user.role, email }, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
