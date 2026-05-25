import { useState, useEffect, useCallback } from 'react';
import Flashcard from '../components/flashcard';
import NavBar from '../components/NavBar';
import { verifySession } from '../lib/dal';

const difficulties = ['easy', 'medium', 'hard'];

export async function getServerSideProps({ req }) {
  const session = await verifySession(req);
  if (!session) {
    return { redirect: { destination: '/Login', permanent: false } };
  }
  return { props: {} };
}

export default function LearnPage() {
  const [vocabulary, setVocabulary] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams({ difficulty });
        const res = await fetch(`/api/getVocabulary?${params}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const vocab = await res.json();
        setVocabulary(vocab);
        setCurrentIndex(0);
        setIsFlipped(false);
      } catch {
        setError('Failed to fetch vocabulary. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVocabulary();
  }, [difficulty]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % vocabulary.length);
    setIsFlipped(false);
  }, [vocabulary.length]);

  // Keyboard shortcuts: Space = flip, ArrowRight = next
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); setIsFlipped((f) => !f); }
      if (e.code === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleNext]);

  const handleAnswer = async (correct) => {
    const vocabularyId = vocabulary[currentIndex]?.word;
    if (!vocabularyId) return;
    try {
      await fetch('/api/progress/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vocabularyId, correct }),
      });
    } catch {
      // non-critical — don't surface progress save failures to the user
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <NavBar />

      <main style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '1.75rem', fontWeight: '700',
            background: 'linear-gradient(135deg, #f1f5f9, rgba(255,255,255,0.6))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            margin: '0 0 0.35rem',
          }}>
            Vocabulary Practice
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', margin: 0 }}>
            Space to flip · → for next
          </p>
        </div>

        {/* Difficulty tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0.625rem',
          padding: '0.25rem',
          gap: '0.25rem',
        }}>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '0.4rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: difficulty === d ? '600' : '400',
                background: difficulty === d
                  ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                  : 'transparent',
                color: difficulty === d ? 'white' : 'rgba(255,255,255,0.45)',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Card area */}
        {isLoading ? (
          <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="skeleton" style={{ height: '260px', borderRadius: '1.25rem' }} />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <div className="skeleton" style={{ height: '20px', width: '60px' }} />
              <div className="skeleton" style={{ height: '36px', width: '100px', borderRadius: '0.5rem' }} />
            </div>
          </div>
        ) : error ? (
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '0.75rem',
            color: '#fca5a5', fontSize: '0.875rem',
          }}>
            {error}
          </div>
        ) : vocabulary.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            No vocabulary found for this difficulty.
          </p>
        ) : (
          <>
            <Flashcard
              word={vocabulary[currentIndex]?.word}
              translation={vocabulary[currentIndex]?.translation}
              image={vocabulary[currentIndex]?.image}
              audio={vocabulary[currentIndex]?.audio}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((f) => !f)}
              onAnswer={handleAnswer}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                {currentIndex + 1} / {vocabulary.length}
              </span>
              <button onClick={handleNext} style={{
                padding: '0.65rem 1.75rem',
                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                border: 'none', borderRadius: '0.5rem',
                color: 'white', fontWeight: '600', fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(34,211,238,0.2)',
                transition: 'opacity 0.15s ease',
              }}>
                Next →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
