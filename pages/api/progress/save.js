import dbConnect from '../../../utils/database';
import Progress from '../../../models/Progress';
import { verifySession } from '../../../lib/dal';
import { calculateNextReviewDate } from '../../../utils/spacedRepetition';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await verifySession(req);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await dbConnect();
    const { vocabularyId, correct } = req.body;

    const existing = await Progress.findOne({ userId: session.userId, vocabularyId });
    const timesReviewed = (existing?.timesReviewed || 0) + 1;
    const nextReviewDate = calculateNextReviewDate(correct, timesReviewed);

    await Progress.findOneAndUpdate(
      { userId: session.userId, vocabularyId },
      {
        $set: { lastReviewed: new Date(), correct, nextReviewDate },
        $inc: { timesReviewed: 1 },
      },
      { upsert: true }
    );

    res.status(200).json({ message: 'Progress saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving progress', error: error.message });
  }
}
