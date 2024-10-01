import { useState, useEffect } from 'react';

async function fetchVocabulary(difficulty) {
  const params = new URLSearchParams(difficulty ? { difficulty } : {});
  const response = await fetch(`/api/getVocabulary?${params}`);
  if (!response.ok) {
    const error = new Error('Failed to fetch vocabulary');
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function useVocabulary(difficulty) {
  const [vocabulary, setVocabulary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchVocabulary(difficulty)
      .then(data => {
        if (isMounted) {
          setVocabulary(data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [difficulty]);

  return { vocabulary, isLoading, error };
}