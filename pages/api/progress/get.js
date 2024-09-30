import { connectToDatabase } from '../../../utils/database';
import { verifyToken } from '../../../utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await verifyToken(req);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const progress = await db.collection('progress')
      .find({ userId: user._id })
      .toArray();

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving progress', error: error.message });
  }
}