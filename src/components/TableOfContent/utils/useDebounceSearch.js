import { useState, useEffect } from 'react';

export const useDebounceSearch = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isCompleted, setIsCompleted] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsCompleted(true);
      setDebouncedValue(value);
    }, delay);

    return () => {
      setIsCompleted(false);
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, isCompleted];
}