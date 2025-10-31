const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- (CREATE) REGISTER A NEW USER ---
router.route('/register').post(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json('Error: Email already in use.');
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // 4. Save the user and respond
    const savedUser = await newUser.save();
    res.json({
        message: 'User registered successfully!',
        userId: savedUser._id
    });

  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});

// --- (READ) LOGIN A USER ---
router.route('/login').post(async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json('Error: Invalid credentials.');
    }

    // 2. Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json('Error: Invalid credentials.');
    }

    // 3. If credentials are correct, create a JWT Token
    const tokenPayload = {
      id: user._id, // This is the user's database ID
      username: user.username
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' } // Token expires in 1 day
    );

    // 4. Send the token back to the frontend
    res.json({
      message: 'Logged in successfully!',
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});

module.exports = router;