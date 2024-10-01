const mongoose = require('mongoose');
const Vocabulary = require('./models/Vocabulary');
require('dotenv').config();

const seedData = [
    // French
    { word: 'Hello', translation: 'Bonjour', language: 'French', topic: 'Greetings', image: 'https://example.com/fr/hello.jpg', audio: 'https://example.com/fr/hello.mp3', difficulty: 'easy' },
    { word: 'Goodbye', translation: 'Au revoir', language: 'French', topic: 'Greetings', image: 'https://example.com/fr/goodbye.jpg', audio: 'https://example.com/fr/goodbye.mp3', difficulty: 'easy' },
    { word: 'Please', translation: 'S\'il vous plaît', language: 'French', topic: 'Manners', image: 'https://example.com/fr/please.jpg', audio: 'https://example.com/fr/please.mp3', difficulty: 'medium' },
    { word: 'Thank you', translation: 'Merci', language: 'French', topic: 'Manners', image: 'https://example.com/fr/thankyou.jpg', audio: 'https://example.com/fr/thankyou.mp3', difficulty: 'easy' },
    { word: 'Yes', translation: 'Oui', language: 'French', topic: 'Basic Words', image: 'https://example.com/fr/yes.jpg', audio: 'https://example.com/fr/yes.mp3', difficulty: 'easy' },
    { word: 'No', translation: 'Non', language: 'French', topic: 'Basic Words', image: 'https://example.com/fr/no.jpg', audio: 'https://example.com/fr/no.mp3', difficulty: 'easy' },
    { word: 'Water', translation: 'Eau', language: 'French', topic: 'Food and Drink', image: 'https://example.com/fr/water.jpg', audio: 'https://example.com/fr/water.mp3', difficulty: 'easy' },
    { word: 'Bread', translation: 'Pain', language: 'French', topic: 'Food and Drink', image: 'https://example.com/fr/bread.jpg', audio: 'https://example.com/fr/bread.mp3', difficulty: 'easy' },
    { word: 'Wine', translation: 'Vin', language: 'French', topic: 'Food and Drink', image: 'https://example.com/fr/wine.jpg', audio: 'https://example.com/fr/wine.mp3', difficulty: 'easy' },
    { word: 'Cheese', translation: 'Fromage', language: 'French', topic: 'Food and Drink', image: 'https://example.com/fr/cheese.jpg', audio: 'https://example.com/fr/cheese.mp3', difficulty: 'medium' },
    { word: 'House', translation: 'Maison', language: 'French', topic: 'Housing', image: 'https://example.com/fr/house.jpg', audio: 'https://example.com/fr/house.mp3', difficulty: 'easy' },
    { word: 'Car', translation: 'Voiture', language: 'French', topic: 'Transportation', image: 'https://example.com/fr/car.jpg', audio: 'https://example.com/fr/car.mp3', difficulty: 'easy' },
    { word: 'Book', translation: 'Livre', language: 'French', topic: 'Education', image: 'https://example.com/fr/book.jpg', audio: 'https://example.com/fr/book.mp3', difficulty: 'easy' },
    { word: 'Friend', translation: 'Ami', language: 'French', topic: 'Relationships', image: 'https://example.com/fr/friend.jpg', audio: 'https://example.com/fr/friend.mp3', difficulty: 'easy' },
    { word: 'Family', translation: 'Famille', language: 'French', topic: 'Relationships', image: 'https://example.com/fr/family.jpg', audio: 'https://example.com/fr/family.mp3', difficulty: 'easy' },
    { word: 'Love', translation: 'Amour', language: 'French', topic: 'Emotions', image: 'https://example.com/fr/love.jpg', audio: 'https://example.com/fr/love.mp3', difficulty: 'easy' },
    { word: 'Happy', translation: 'Heureux', language: 'French', topic: 'Emotions', image: 'https://example.com/fr/happy.jpg', audio: 'https://example.com/fr/happy.mp3', difficulty: 'medium' },
    { word: 'Sad', translation: 'Triste', language: 'French', topic: 'Emotions', image: 'https://example.com/fr/sad.jpg', audio: 'https://example.com/fr/sad.mp3', difficulty: 'medium' },
    { word: 'Beautiful', translation: 'Beau', language: 'French', topic: 'Descriptions', image: 'https://example.com/fr/beautiful.jpg', audio: 'https://example.com/fr/beautiful.mp3', difficulty: 'medium' },
    { word: 'Ugly', translation: 'Laid', language: 'French', topic: 'Descriptions', image: 'https://example.com/fr/ugly.jpg', audio: 'https://example.com/fr/ugly.mp3', difficulty: 'medium' },
  
    // Spanish
    { word: 'Hello', translation: 'Hola', language: 'Spanish', topic: 'Greetings', image: 'https://example.com/es/hello.jpg', audio: 'https://example.com/es/hello.mp3', difficulty: 'easy' },
    { word: 'Goodbye', translation: 'Adiós', language: 'Spanish', topic: 'Greetings', image: 'https://example.com/es/goodbye.jpg', audio: 'https://example.com/es/goodbye.mp3', difficulty: 'easy' },
    { word: 'Please', translation: 'Por favor', language: 'Spanish', topic: 'Manners', image: 'https://example.com/es/please.jpg', audio: 'https://example.com/es/please.mp3', difficulty: 'easy' },
    { word: 'Thank you', translation: 'Gracias', language: 'Spanish', topic: 'Manners', image: 'https://example.com/es/thankyou.jpg', audio: 'https://example.com/es/thankyou.mp3', difficulty: 'easy' },
    { word: 'Yes', translation: 'Sí', language: 'Spanish', topic: 'Basic Words', image: 'https://example.com/es/yes.jpg', audio: 'https://example.com/es/yes.mp3', difficulty: 'easy' },
    { word: 'No', translation: 'No', language: 'Spanish', topic: 'Basic Words', image: 'https://example.com/es/no.jpg', audio: 'https://example.com/es/no.mp3', difficulty: 'easy' },
    { word: 'Water', translation: 'Agua', language: 'Spanish', topic: 'Food and Drink', image: 'https://example.com/es/water.jpg', audio: 'https://example.com/es/water.mp3', difficulty: 'easy' },
    { word: 'Bread', translation: 'Pan', language: 'Spanish', topic: 'Food and Drink', image: 'https://example.com/es/bread.jpg', audio: 'https://example.com/es/bread.mp3', difficulty: 'easy' },
    { word: 'Wine', translation: 'Vino', language: 'Spanish', topic: 'Food and Drink', image: 'https://example.com/es/wine.jpg', audio: 'https://example.com/es/wine.mp3', difficulty: 'easy' },
    { word: 'Cheese', translation: 'Queso', language: 'Spanish', topic: 'Food and Drink', image: 'https://example.com/es/cheese.jpg', audio: 'https://example.com/es/cheese.mp3', difficulty: 'easy' },
    { word: 'House', translation: 'Casa', language: 'Spanish', topic: 'Housing', image: 'https://example.com/es/house.jpg', audio: 'https://example.com/es/house.mp3', difficulty: 'easy' },
    { word: 'Car', translation: 'Coche', language: 'Spanish', topic: 'Transportation', image: 'https://example.com/es/car.jpg', audio: 'https://example.com/es/car.mp3', difficulty: 'easy' },
    { word: 'Book', translation: 'Libro', language: 'Spanish', topic: 'Education', image: 'https://example.com/es/book.jpg', audio: 'https://example.com/es/book.mp3', difficulty: 'easy' },
    { word: 'Friend', translation: 'Amigo', language: 'Spanish', topic: 'Relationships', image: 'https://example.com/es/friend.jpg', audio: 'https://example.com/es/friend.mp3', difficulty: 'easy' },
    { word: 'Family', translation: 'Familia', language: 'Spanish', topic: 'Relationships', image: 'https://example.com/es/family.jpg', audio: 'https://example.com/es/family.mp3', difficulty: 'easy' },
    { word: 'Love', translation: 'Amor', language: 'Spanish', topic: 'Emotions', image: 'https://example.com/es/love.jpg', audio: 'https://example.com/es/love.mp3', difficulty: 'easy' },
    { word: 'Happy', translation: 'Feliz', language: 'Spanish', topic: 'Emotions', image: 'https://example.com/es/happy.jpg', audio: 'https://example.com/es/happy.mp3', difficulty: 'easy' },
    { word: 'Sad', translation: 'Triste', language: 'Spanish', topic: 'Emotions', image: 'https://example.com/es/sad.jpg', audio: 'https://example.com/es/sad.mp3', difficulty: 'medium' },
    { word: 'Beautiful', translation: 'Hermoso', language: 'Spanish', topic: 'Descriptions', image: 'https://example.com/es/beautiful.jpg', audio: 'https://example.com/es/beautiful.mp3', difficulty: 'medium' },
    { word: 'Ugly', translation: 'Feo', language: 'Spanish', topic: 'Descriptions', image: 'https://example.com/es/ugly.jpg', audio: 'https://example.com/es/ugly.mp3', difficulty: 'medium' },
  
    // German
    { word: 'Hello', translation: 'Hallo', language: 'German', topic: 'Greetings', image: 'https://example.com/de/hello.jpg', audio: 'https://example.com/de/hello.mp3', difficulty: 'easy' },
    { word: 'Goodbye', translation: 'Auf Wiedersehen', language: 'German', topic: 'Greetings', image: 'https://example.com/de/goodbye.jpg', audio: 'https://example.com/de/goodbye.mp3', difficulty: 'medium' },
    { word: 'Please', translation: 'Bitte', language: 'German', topic: 'Manners', image: 'https://example.com/de/please.jpg', audio: 'https://example.com/de/please.mp3', difficulty: 'easy' },
    { word: 'Thank you', translation: 'Danke', language: 'German', topic: 'Manners', image: 'https://example.com/de/thankyou.jpg', audio: 'https://example.com/de/thankyou.mp3', difficulty: 'easy' },
    { word: 'Yes', translation: 'Ja', language: 'German', topic: 'Basic Words', image: 'https://example.com/de/yes.jpg', audio: 'https://example.com/de/yes.mp3', difficulty: 'easy' },
    { word: 'No', translation: 'Nein', language: 'German', topic: 'Basic Words', image: 'https://example.com/de/no.jpg', audio: 'https://example.com/de/no.mp3', difficulty: 'easy' },
    { word: 'Water', translation: 'Wasser', language: 'German', topic: 'Food and Drink', image: 'https://example.com/de/water.jpg', audio: 'https://example.com/de/water.mp3', difficulty: 'easy' },
    { word: 'Bread', translation: 'Brot', language: 'German', topic: 'Food and Drink', image: 'https://example.com/de/bread.jpg', audio: 'https://example.com/de/bread.mp3', difficulty: 'easy' },
    { word: 'Wine', translation: 'Wein', language: 'German', topic: 'Food and Drink', image: 'https://example.com/de/wine.jpg', audio: 'https://example.com/de/wine.mp3', difficulty: 'easy' },
    { word: 'Cheese', translation: 'Käse', language: 'German', topic: 'Food and Drink', image: 'https://example.com/de/cheese.jpg', audio: 'https://example.com/de/cheese.mp3', difficulty: 'medium' },
    { word: 'House', translation: 'Haus', language: 'German', topic: 'Housing', image: 'https://example.com/de/house.jpg', audio: 'https://example.com/de/house.mp3', difficulty: 'easy' },
    { word: 'Car', translation: 'Auto', language: 'German', topic: 'Transportation', image: 'https://example.com/de/car.jpg', audio: 'https://example.com/de/car.mp3', difficulty: 'easy' },
    { word: 'Book', translation: 'Buch', language: 'German', topic: 'Education', image: 'https://example.com/de/book.jpg', audio: 'https://example.com/de/book.mp3', difficulty: 'easy' },
    { word: 'Friend', translation: 'Freund', language: 'German', topic: 'Relationships', image: 'https://example.com/de/friend.jpg', audio: 'https://example.com/de/friend.mp3', difficulty: 'easy' },
    { word: 'Family', translation: 'Familie', language: 'German', topic: 'Relationships', image: 'https://example.com/de/family.jpg', audio: 'https://example.com/de/family.mp3', difficulty: 'easy' },
    { word: 'Love', translation: 'Liebe', language: 'German', topic: 'Emotions', image: 'https://example.com/de/love.jpg', audio: 'https://example.com/de/love.mp3', difficulty: 'easy' },
    { word: 'Happy', translation: 'Glücklich', language: 'German', topic: 'Emotions', image: 'https://example.com/de/love.jpg', audio: 'https://example.com/de/love.mp3', difficulty: 'easy' }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Vocabulary.deleteMany({});
    await Vocabulary.insertMany(seedData);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();