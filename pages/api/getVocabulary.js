// import { getVocabularyFromDB } from '../../services/vocabularyServices';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//   }

//   try {
//     const { difficulty } = req.query;
//     const vocabularyList = await getVocabularyFromDB(difficulty);
//     res.status(200).json(vocabularyList);
//   } catch (error) {
//     console.error('Error in getVocabulary:', error);
//     res.status(500).json({ error: 'Failed to fetch vocabulary', details: error.message });
//   }
// }


import { getVocabulary } from '../../utils/getVocabulary';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { difficulty } = req.query;
      const vocabularyList = await getVocabulary(difficulty);
      res.status(200).json(vocabularyList);
    } catch (error) {
      console.error('Error in getVocabulary:', error);
      res.status(500).json({ error: 'Failed to fetch vocabulary', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}