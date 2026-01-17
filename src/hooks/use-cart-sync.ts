import { setCartState } from "@/actions/set-cart-state";
import { useCartStore } from "@/store/cart";
import { useState, useCallback } from "react";

export function useCartSync() {
  const [isUpdating, setIsUpdating] = useState(false);

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
