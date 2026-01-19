import { useEffect, useRef, useCallback, useState } from "react";

export function useDebounce(defaultDelay: number = 300) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const debounce = useCallback(
    (callback: () => void, delay?: number) => {
      cancel();
      timeoutRef.current = setTimeout(callback, delay ?? defaultDelay);
    },
    [defaultDelay, cancel]
  );

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return {
    debounce,
    cancel,
  };
}

export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
