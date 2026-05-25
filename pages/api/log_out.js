import { deleteSession } from '@/lib/session';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    deleteSession(res);
    return res.status(200).json({ success: true, message: 'Logged out.' });
}
