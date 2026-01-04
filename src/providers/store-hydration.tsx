"use client";

import { getAuthState } from "@/actions/get-auth-state";
import { getCartState } from "@/actions/get-cart-state";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

export const StoreHydration = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    getAuthState().then(({ token }) => {
      if (token) setToken(token);
      setHydrated(true);
    });
    getCartState().then(({ cart }) => {
      if (cart.length > 0) {
        useCartStore.setState({ cart });
      }
    });
  }, [setToken, setHydrated]);
  return null;
};
