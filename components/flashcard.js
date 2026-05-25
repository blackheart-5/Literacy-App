import React, { useState } from 'react';
import styles from '../styles/FlashCard.module.css';

const Flashcard = ({ word, translation, image, audio, isFlipped, onFlip, onAnswer }) => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const correct = userInput.trim().toLowerCase() === translation.toLowerCase();
    setFeedback(correct ? 'Correct!' : 'Incorrect. Try again.');
    if (onAnswer) onAnswer(correct);
  };

  // Reset input/feedback when the card changes (word changes)
  React.useEffect(() => {
    setUserInput('');
    setFeedback('');
  }, [word]);

  return (
    <div className={styles.flashcard} onClick={onFlip}>
      <div className={`${styles.flashcardInner} ${isFlipped ? styles.flipped : ''}`}>

        <div className={styles.flashcardFront}>
          <h2>{word}</h2>
          {image && (
            <img
              src={image}
              alt={word}
              className={styles.vocabularyImage}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          {audio && (
            <audio controls src={audio} onClick={(e) => e.stopPropagation()}>
              Your browser does not support audio.
            </audio>
          )}
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.5rem' }}>
            Press Space or tap to flip
          </p>
        </div>

        <div className={styles.flashcardBack} onClick={(e) => e.stopPropagation()}>
          <p>Translation: <strong style={{ color: '#22d3ee' }}>{translation}</strong></p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the translation…"
              onClick={(e) => e.stopPropagation()}
              autoFocus={isFlipped}
            />
            <button type="submit" className={styles.audioButton}>Check</button>
          </form>
          {feedback && (
            <p style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: feedback === 'Correct!' ? '#4ade80' : '#f87171',
              marginTop: '0.25rem',
            }}>
              {feedback}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Flashcard;
