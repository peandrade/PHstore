// src/components/providers/likes-provider.tsx
"use client";

import { getUserLikes } from "@/actions";
import { useAuthStore } from "@/store/auth";
import { useLikesStore } from "@/store/likes";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export const LikesProvider = ({ children }: Props) => {
  const { token, hydrated: authHydrated } = useAuthStore((state) => state);
  const { setLikes, setHydrated, clearLikes } = useLikesStore((state) => state);

  useEffect(() => {
    const loadLikes = async () => {
      const isLoggedIn =
        authHydrated && typeof token === "string" && token.length > 0;

      if (isLoggedIn) {
        try {
          const likes = await getUserLikes();
          setLikes(likes);
        } catch (error) {
          console.error("Erro ao carregar likes:", error);
        }
      } else {
        clearLikes();
      }

      setHydrated(true);
    };

    if (authHydrated) {
      loadLikes();
    }
  }, [token, authHydrated, setLikes, setHydrated, clearLikes]);

  return <>{children}</>;
};