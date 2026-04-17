// controllers/authController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Google-only account trying to use password login
  if (!user.password) {
    return res.status(400).json({ message: "This account uses Google Sign-In" });
  }

  let isMatch = false;

  // Try bcrypt compare first
  try {
    isMatch = await bcrypt.compare(password, user.password);
  } catch (err) {
    console.error("Bcrypt compare error:", err);
  }

  // Fallback for pre-bcrypt legacy plaintext passwords
  if (!isMatch && password === user.password) {
    isMatch = true;
    
    // Automatically migrate their plain text password to hashed version securely in the background
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
  }

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
};

// Google OAuth — upsert user by googleId
const googleLogin = async (req, res) => {
  const { googleId, name, email, avatar } = req.body;

  if (!googleId || !email) {
    return res.status(400).json({ message: "Invalid Google credentials" });
  }

  // Try to find by googleId first, then by email
  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      // Link Google account to existing email account
      user.googleId = googleId;
      user.avatar = avatar || null;
      await user.save();
    } else {
      // Brand new Google user
      user = await User.create({
        name,
        email,
        googleId,
        avatar: avatar || null,
        role: "user",
      });
    }
  }

  res.status(200).json({
    message: "Google login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
};

module.exports = { registerUser, loginUser, googleLogin };