import bcrypt from 'bcrypt';
import User from '@/models/User.js';
import dbConnect from '@/utils/database.js';
import { createSession } from '@/lib/session';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Provide both email and password.' });
        }

        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        const { cookie } = await createSession(user._id.toString());
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ success: true, message: 'Login successful.' });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}
