import { setCartState } from "@/actions/set-cart-state";
import { useCartStore } from "@/store/cart";
import { useState, useCallback } from "react";

/**
 * Custom hook for synchronizing cart state with server-side cookies
 *
 * Provides methods to update cart quantities and sync with backend
 * while managing loading states automatically.
 *
 * @example
 * ```tsx
 * const { syncCart, isUpdating } = useCartSync();
 *
 * const handleAddToCart = async () => {
 *   cartStore.addItem({ productId: 1, quantity: 1 });
 *   await syncCart();
 * };
 * ```
 */
export function useCartSync() {
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Syncs the current cart state with server-side cookies
   * @returns Promise that resolves when sync is complete
   */
  const syncCart = useCallback(async () => {
    setIsUpdating(true);
    try {
      const state = useCartStore.getState();
      await setCartState(state.cart, state.kits);
    } catch (error) {
      console.error("Error syncing cart:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  /**
   * Executes a cart operation and automatically syncs with backend
   * @param operation - Function that modifies cart state
   * @returns Promise that resolves when operation and sync are complete
   */
  const withSync = useCallback(
    async (operation: () => void) => {
      if (isUpdating) return;

      setIsUpdating(true);
      try {
        operation();
        const state = useCartStore.getState();
        await setCartState(state.cart, state.kits);
      } catch (error) {
        console.error("Error in cart operation:", error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [isUpdating]
  );

  return {
    syncCart,
    withSync,
    isUpdating,
  };
}
