import dbConnect from '../utils/database';
import Vocabulary from '../models/Vocabulary';

export async function getVocabularyFromDB(difficulty) {
  await dbConnect();
  const query = difficulty ? { difficulty } : {};
  return await Vocabulary.find(query).limit(20).lean();
}