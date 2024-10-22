import dbConnect from '../../../utils/database';
import User from '../../../models/User';
import bcrypts from 'bcryptjs';




// API route to handle registration
export default async function handler(req, res) {
    await dbConnect(); // connect to the database
  
    if (req.method === 'POST') {
      const { username, email, password } = req.body;
  
      // Basic validation (you can add more validation if needed)
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already in use.' });
        }
  
        // Save user details
        const newUser = new User({ username, email, password });
        await newUser.save();
  
        return res.status(201).json({ message: 'User registered successfully.' });
      } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }