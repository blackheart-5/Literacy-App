import {useState, useEffect} from 'react';
import Flashcard from '../components/flashcard';
import { getVocabulary} from './api/progress/get';
import {saveProgress} from'./api/progress/save';

// export default function Learn() {
//     const[vocabulary, setVocab] = useState([]);
//     const[currentIndex, setCurrentIndex] = useState(0);
//     const[correctAnswers, setCorrectAnswers] = useState(0);

//     useEffect(() => {
//         fetch('api/vocabulary(data')
//         .then(response => response.json())
//         .then(data => setVocab(data));
//     }, []);

//     const handleAnswer = (isCorrect) =>{
//         if (isCorrect) {
//             setCorrectAnswers(correctAnswers+1);
//         }

//         setCurrentIndex((currentIndex+1)%vocabulary.length);
//     };

//     if (vocabulary.length === 0){
//         return <div>loading...</div>;
//     }

//     const currentWord = vocabulary[currentIndex]

//     return (
//         <div>
//           <h1>Language Learning</h1>
//           <Flashcard
//             word={currentWord.word}
//             translation={currentWord.translation}
//             imageUrl={currentWord.imageUrl}
//             audioUrl={currentWord.audioUrl}
//             onAnswer={handleAnswer}
//           />
//           <div>Correct Answers: {correctAnswers}</div>
//         </div>
//       );
// }



// const LearnPage = () => {
//     const [vocabulary, setVocabulary] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [difficulty, setDifficulty] = useState('medium');
  
//     useEffect(() => {
//       const fetchVocabulary = async () => {
//         const vocab = await getVocabulary(difficulty);
//         setVocabulary(vocab);
//       };
//       fetchVocabulary();
//     }, [difficulty]);
  
//     const handleNext = () => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabulary.length);
//     };
  
//     const handleDifficultyChange = (e) => {
//       setDifficulty(e.target.value);
//       setCurrentIndex(0);
//     };
  
//     if (vocabulary.length === 0) {
//       return <div>Loading...</div>;
//     }
  
//     return (
//       <div>
//         <h1>Learn Vocabulary</h1>
//         <select value={difficulty} onChange={handleDifficultyChange}>
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>
//         <Flashcard {...vocabulary[currentIndex]} />
//         <button onClick={handleNext}>Next</button>
//       </div>
//     );
//   };

//   export default LearnPage;







const LearnPage = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const vocab = await getVocabulary(difficulty);
        console.log('miss error');
        setVocabulary(vocab);
      }

      catch (err) {
        setError('Failed to fetch vocabulary. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVocabulary();
  }, [difficulty]);

  const handleNext = async (correct) => {
    try {
      await saveProgress(vocabulary[currentIndex]._id, correct);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabulary.length);
    } catch (err) {
      setError('Failed to save progress. Please try again.');
    }
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    setCurrentIndex(0);
  };

  if (isLoading) {
    return <div className="container fade-in">Loading...</div>;
  }

  if (error) {
    return <div className="container fade-in">Error: {error}</div>;
  }

  if (vocabulary.length === 0) {
    return <div className="container fade-in">No vocabulary found for the selected difficulty.</div>;
  }

  return (
    <div className="container fade-in">
      <h1>Learn Vocabulary</h1>
      <select value={difficulty} onChange={handleDifficultyChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <Flashcard
        {...vocabulary[currentIndex]}
        onAnswer={(correct) => handleNext(correct)}
      />
    </div>
  );
};

export default LearnPage;