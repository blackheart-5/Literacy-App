import { seedData } from '../models/vocabularyData';

export function getVocabulary(difficulty) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = difficulty 
        ? seedData.filter(item => item.difficulty === difficulty)
        : seedData;
      resolve(filteredData);
    }, 500); // Simulating a 500ms delay to mimic an API call
  });
}