"use client";

import { getAuthState } from "@/actions/get-auth-state";
import { getCartState } from "@/actions/get-cart-state";
import { getUserLikes } from "@/actions/get-user-likes";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useLikesStore } from "@/store/likes";
import { useEffect } from "react";

export const StoreHydration = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setHydrated = useAuthStore((state) => state.setHydrated);
  const setLikes = useLikesStore((state) => state.setLikes);
  const setLikesHydrated = useLikesStore((state) => state.setHydrated);

  useEffect(() => {
    const hydrate = async () => {
      const { token } = await getAuthState();
      if (token) {
        setToken(token);

        try {
          const likes = await getUserLikes();
          setLikes(likes);
        } catch (error) {
          console.error("Erro ao carregar likes:", error);
        }
      }
      setHydrated(true);
      setLikesHydrated(true);

      const { cart, kits } = await getCartState();
      if (cart.length > 0 || kits.length > 0) {
        useCartStore.setState({ cart, kits });
      }
    };

    hydrate();
  }, [setToken, setHydrated, setLikes, setLikesHydrated]);

  return null;
};
