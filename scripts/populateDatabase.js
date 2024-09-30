import { connectToDatabase } from '../utils/database';
import Vocabulary from '../models/Vocabulary';

const vocabularyData = [
  {
    word: 'Bonjour',
    translation: 'Hello',
    language: 'French',
    topic: 'Greetings',
    image: '/images/hello.jpg',
    audio: '/audio/bonjour.mp3',
    difficulty: 'easy',
  },
  {
    word: 'Gato',
    translation: 'Cat',
    language: 'Spanish',
    topic: 'Animals',
    image: '/images/cat.jpg',
    audio: '/audio/gato.mp3',
    difficulty: 'easy',
  },
  // Add more vocabulary items here
];

async function populateDatabase() {
  try {
    await connectToDatabase();
    await Vocabulary.deleteMany({}); // Clear existing data
    await Vocabulary.insertMany(vocabularyData);
    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    process.exit();
  }
}

populateDatabase();