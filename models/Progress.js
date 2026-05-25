import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vocabularyId: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    default: false,
  },
  timesReviewed: {
    type: Number,
    default: 0,
  },
  lastReviewed: {
    type: Date,
    default: Date.now,
  },
  nextReviewDate: {
    type: Date,
  },
});

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
