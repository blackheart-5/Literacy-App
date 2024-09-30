import { connectToDatabase } from '../../../utils/database';
import { verifyToken } from '../../../utils/auth';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await verifyToken(request);

    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const { vocabularyId, correct } = request.body;

    await db.collection('progress').updateOne(
      { userId: user._id, vocabularyId },
      {
        $set: {
          lastReviewed: new Date(),
          correct,
        },
        $inc: { timesReviewed: 1 },
      },
      { upsert: true }
    );

    response.status(200).json({ message: 'Progress saved successfully' });
  } catch (error) {
    response.status(500).json({ message: 'Error saving progress', error: error.message });
  }
}