import { useState, useEffect, useCallback } from 'react';

export function useRandomQuote(quotes: string[], intervalMs: number = 12000) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const next = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
      setFade(true);
    }, 600);
  }, [quotes.length]);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [next, intervalMs, quotes.length]);

  return { quote: quotes[index], fade };
}
