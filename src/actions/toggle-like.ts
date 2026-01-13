// src/actions/toggle-like.ts
"use server";

import { getServerAuthToken } from "@/libs/server-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ToggleLikeResponse = {
  success: boolean;
  liked: boolean;
  error?: string;
};

export const toggleLike = async (
  productId: number
): Promise<ToggleLikeResponse> => {
  try {
    const token = await getServerAuthToken();

    if (!token) {
      return {
        success: false,
        liked: false,
        error: "Faça login para favoritar produtos",
      };
    }

    const response = await fetch(`${API_URL}/products/${productId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        liked: false,
        error: data.error || "Erro ao favoritar produto",
      };
    }

    const data = await response.json();
    return {
      success: true,
      liked: data.liked,
    };
  } catch (error) {
    console.error("Erro ao favoritar:", error);
    return {
      success: false,
      liked: false,
      error: "Erro ao conectar com o servidor",
    };
  }
};