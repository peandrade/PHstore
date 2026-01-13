// src/components/product/like-button.tsx
"use client";

import { toggleLike } from "@/actions/toggle-like";
import { useAuthStore } from "@/store/auth";
import { useLikesStore } from "@/store/likes";
import { useToastStore } from "@/store/toast";
import { useState } from "react";

type Props = {
  productId: number;
  initialLiked?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button";
  className?: string;
};

export const LikeButton = ({
  productId,
  initialLiked = false,
  size = "md",
  variant = "icon",
  className = "",
}: Props) => {
  const { token, hydrated: authHydrated } = useAuthStore((state) => state);
  const { isLiked, addLike, removeLike, hydrated: likesHydrated } = useLikesStore((state) => state);
  const addToast = useToastStore((state) => state.addToast);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = authHydrated && typeof token === "string" && token.length > 0;
  
  // Se não está logado, nunca mostra como liked
  // Se está logado e o store está hidratado, usa o store
  // Se está logado mas store não hidratou, usa initialLiked
  const liked = isLoggedIn 
    ? (likesHydrated ? isLiked(productId) : initialLiked)
    : false;

  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-14",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      addToast("login", "Faça login para favoritar produtos");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    // Atualização otimista
    if (liked) {
      removeLike(productId);
    } else {
      addLike(productId);
    }

    try {
      const response = await toggleLike(productId);

      if (!response.success) {
        // Reverte em caso de erro
        if (liked) {
          addLike(productId);
        } else {
          removeLike(productId);
        }
        console.error(response.error);
      }
    } catch (error) {
      // Reverte em caso de erro
      if (liked) {
        addLike(productId);
      } else {
        removeLike(productId);
      }
      console.error("Erro ao favoritar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleLike(e as unknown as React.MouseEvent);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      onKeyDown={handleKeyDown}
      disabled={isLoading}
      aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      aria-pressed={liked}
      className={`
        ${sizeClasses[size]}
        ${variant === "button" ? "border border-gray-200 bg-white hover:bg-gray-50 rounded-sm" : ""}
        flex justify-center items-center 
        hover:scale-110 transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {liked ? (
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="#ef4444"
          className={isLoading ? "animate-pulse" : ""}
        >
          <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
        </svg>
      ) : (
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`text-gray-400 hover:text-red-400 transition-colors ${isLoading ? "animate-pulse" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"
          />
        </svg>
      )}
    </button>
  );
};