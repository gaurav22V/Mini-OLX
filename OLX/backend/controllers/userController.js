const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register controller for regfistering as a user
exports.register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hash, phone });
    res.json({ user });
  } catch(e) {
    res.status(400).json({ error: e.message });
  }
};

// Login controller for login as a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Checking if user exists
  if (!user) 
    return res.status(400).json({ error: 'User not found' });

  // User found and comparing password
  const isMatch = await bcrypt.compare(password, user.password);

  // Comparing hashed passwords
  if (!isMatch) 
    return res.status(400).json({ error: 'Incorrect Password' });

  // Generating a token if Password matches
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
};

// Profile page controller for fetching data of user
exports.profile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const products = await Product.find({ owner: id });

    return res.json({ user, products });
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
