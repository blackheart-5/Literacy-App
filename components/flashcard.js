import React, {useState} from 'react';
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player';

// const Flashcard = ({ word, translation, imageUrl,audioUrl, onAnswer}) => {
//     const [flipped, setFlipped] = useState(false);
//     const[userInput, setUserInput] = useState('');

// //update the flip state when card is flipped and setflip updates with !flip
//     const handleflip = () => setFlipped=(!flipped);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onAnswer(userInput.toLowerCase() === translation.toLowerCase());
//         setUserInput('');
//         setFlipped(false);
//     };

//     const playAudio = () => {
//         const audio = new Audio(audioUrl);
//         audio.play();
//     };


//     return (
//         <div className="flashcard">
//           <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
//             <div className="flashcard-front">
//               <h2>{word}</h2>
//               {imageUrl && <Image src={imageUrl} alt={word} />}
//               {audioUrl && <button onClick={playAudio}>Play Audio</button>}
//               <button onClick={handleFlip}>Flip</button>
//             </div>
//             <div className="flashcard-back">
//               <h2>{translation}</h2>
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   placeholder="Enter translation"
//                 />
//                 <button type="submit">Check</button>
//               </form>
//             </div>
//           </div>
//         </div>
//     );
// };
    
// export default Flashcard;








const Flashcard = ({ word, translation, image, audio }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === translation.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect. Try again.');
    }
  };

  return (
    <div className="flashcard" onClick={handleFlip}>
      <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <h2>{word}</h2>
          <Image src={image} width={500} height={300} alt={word} />
          <ReactAudioPlayer src={audio} controls />
        </div>
        <div className="flashcard-back">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter translation"
            />
            <button type="submit">Check</button>
          </form>
          {feedback && <p>{feedback}</p>}
          <p>Correct translation: {translation}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;