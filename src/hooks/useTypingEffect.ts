import { useState, useEffect, useRef, useCallback } from 'react';

export function useTypingEffect(
  text: string,
  speed: number = 50,
  enabled: boolean = true
) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    indexRef.current = 0;
    setDisplayed('');
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    reset();

    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timerRef.current = setTimeout(type, speed + Math.random() * 30);
      } else {
        setIsComplete(true);
      }
    };

    timerRef.current = setTimeout(type, 800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, enabled, reset]);

  return { displayed, isComplete };
}
