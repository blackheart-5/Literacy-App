import dbConnect from '../../../utils/database';
import Progress from '../../../models/Progress';
import { verifySession } from '../../../lib/dal';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await verifySession(req);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await dbConnect();
    const progress = await Progress.find({ userId: session.userId }).lean();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving progress', error: error.message });
  }
}
