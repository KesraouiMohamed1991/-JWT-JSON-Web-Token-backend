import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};




export const signup = async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed, password);

  try {
    const user = await User.create({ username, password: hashed });
    res.status(201).json({ message: 'User created', user: user });
  } catch {
    res.status(400).json({ error: 'User exists' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = createToken(user._id);
  let maxAge = 15 * 60 * 1000;
  //maxage in minutes is 15


  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
  res.json({ message: 'Login success' });
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
};



export const protectedRoute = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};
