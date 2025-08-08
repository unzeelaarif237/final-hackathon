import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET;

// SIGNUP
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
};

// RESET PASSWORD (Send link)
export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: 'no-reply@app.com',
      to: email,
      subject: 'Reset Password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });

    res.status(200).json({ message: 'Reset link sent' });
  } catch (err) {
    res.status(500).json({ message: 'Email error' });
  }
};

// UPDATE EMAIL
export const updateEmail = async (req, res) => {
  const { id, newEmail } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: 'Email updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

