import React, { useState } from 'react';

const Tutorial = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Welcome', content: 'Welcome to the Language Learning App! Let\'s get you started.' },
    { title: 'Flashcards', content: 'You\'ll be shown flashcards with words to learn. Try to guess the translation!' },
    { title: 'Audio', content: 'Click the speaker icon to hear the pronunciation of the word.' },
    { title: 'Progress', content: 'Track your progress in the Progress section. Keep learning to improve!' },
    { title: 'Ready', content: 'You\'re all set! Happy learning!' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="tutorial">
      <h2>{steps[step].title}</h2>
      <p>{steps[step].content}</p>
      <div>
        {step > 0 && <button onClick={handlePrevious}>Previous</button>}
        {step < steps.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={() => {}}>Start Learning</button>
        )}
      </div>
    </div>
  );
};

export default Tutorial;