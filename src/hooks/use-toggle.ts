import { useState, useCallback } from "react";

/**
 * Custom hook for managing boolean state with convenient toggle function
 *
 * Simplifies working with boolean flags (modals, dropdowns, etc.)
 *
 * @param initialValue - Initial boolean value (default: false)
 * @returns Tuple of [value, toggle, setTrue, setFalse, setValue]
 *
 * @example Basic usage
 * ```tsx
 * const [isOpen, toggle, open, close] = useToggle();
 *
 * return (
 *   <>
 *     <button onClick={toggle}>Toggle Modal</button>
 *     <button onClick={open}>Open Modal</button>
 *     <button onClick={close}>Close Modal</button>
 *     {isOpen && <Modal />}
 *   </>
 * );
 * ```
 *
 * @example With initial value
 * ```tsx
 * const [isDarkMode, toggleTheme, enableDark, enableLight] = useToggle(true);
 * ```
 */
export function useToggle(
  initialValue: boolean = false
): [
  boolean,
  () => void,
  () => void,
  () => void,
  (value: boolean) => void
] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse, setValue];
}
