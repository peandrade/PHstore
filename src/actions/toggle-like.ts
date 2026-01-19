"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";

type ToggleLikeResponse = {
  success: boolean;
  liked: boolean;
  error?: string;
};

type ApiToggleLikeResponse = {
  liked: boolean;
};

export const toggleLike = async (
  productId: number
): Promise<ToggleLikeResponse> => {
  const result = await authenticatedFetch<ApiToggleLikeResponse>(
    `/products/${productId}/like`,
    {
      method: "POST",
    }
  );

  if (!result.success) {
    return {
      success: false,
      liked: false,
      error: result.error || "Erro ao favoritar produto",
    };
  }

  return {
    success: true,
    liked: result.data.liked,
  };
};
