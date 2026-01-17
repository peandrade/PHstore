import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for persisting state in localStorage with automatic sync
 *
 * Provides a stateful value that persists across page reloads and syncs
 * across browser tabs/windows.
 *
 * @param key - localStorage key
 * @param initialValue - Default value if no stored value exists
 * @returns Tuple of [value, setValue, removeValue]
 *
 * @example
 * ```tsx
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 *
 * // Update value (automatically saved to localStorage)
 * setTheme('dark');
 *
 * // Remove from localStorage
 * removeTheme();
 * ```
 *
 * @example With object
 * ```tsx
 * const [user, setUser] = useLocalStorage('user', { name: '', email: '' });
 *
 * setUser({ name: 'John', email: 'john@example.com' });
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));

          // Dispatch custom event to sync across tabs
          window.dispatchEvent(
            new CustomEvent("local-storage-change", {
              detail: { key, value: valueToStore },
            })
          );
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);

        // Dispatch custom event to sync across tabs
        window.dispatchEvent(
          new CustomEvent("local-storage-change", {
            detail: { key, value: undefined },
          })
        );
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if (e instanceof StorageEvent) {
        // Native storage event (from other tabs)
        if (e.key === key && e.newValue !== null) {
          try {
            setStoredValue(JSON.parse(e.newValue) as T);
          } catch (error) {
            console.error(`Error parsing localStorage value for key "${key}":`, error);
          }
        }
      } else {
        // Custom event (from same tab)
        const customEvent = e as CustomEvent<{ key: string; value: T }>;
        if (customEvent.detail.key === key) {
          setStoredValue(customEvent.detail.value ?? initialValue);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange as EventListener);
      window.addEventListener("local-storage-change", handleStorageChange as EventListener);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange as EventListener);
        window.removeEventListener("local-storage-change", handleStorageChange as EventListener);
      }
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
