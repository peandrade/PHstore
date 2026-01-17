import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for debouncing function calls
 *
 * Delays the execution of a function until after a specified delay has passed
 * since the last time it was invoked. Useful for search inputs, resize handlers, etc.
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Object with debounced function and cancel method
 *
 * @example
 * ```tsx
 * const { debounce, cancel } = useDebounce();
 *
 * const handleSearch = (query: string) => {
 *   debounce(() => {
 *     performSearch(query);
 *   }, 500);
 * };
 * ```
 */
export function useDebounce(defaultDelay: number = 300) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Cancels any pending debounced function call
   */
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  /**
   * Debounces a function call
   * @param callback - Function to execute after delay
   * @param delay - Delay in milliseconds (overrides default)
   */
  const debounce = useCallback(
    (callback: () => void, delay?: number) => {
      cancel();
      timeoutRef.current = setTimeout(callback, delay ?? defaultDelay);
    },
    [defaultDelay, cancel]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return {
    debounce,
    cancel,
  };
}

/**
 * Custom hook for debouncing a value
 *
 * Returns a debounced version of the input value that only updates
 * after the specified delay has passed without changes.
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced value
 *
 * @example
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState('');
 * const debouncedQuery = useDebouncedValue(searchQuery, 500);
 *
 * useEffect(() => {
 *   // This only runs when debouncedQuery changes
 *   performSearch(debouncedQuery);
 * }, [debouncedQuery]);
 * ```
 */
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
