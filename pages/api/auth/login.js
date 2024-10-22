

import dbConnect from '../../../utils/database';
import User from '../../../models/User';
import bcrypts from 'bcryptjs';
import jwt  from 'jsonwebtoken';


export default async function handler(req, res) {
  await dbConnect(); // Ensure database is connected

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      // At this point, the user is authenticated
      return res.status(200).json({ message: 'Login successful.' });
      
      // Optionally, you can add logic for setting up sessions or JWT tokens for authentication
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
