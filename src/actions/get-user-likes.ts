// src/actions/get-user-likes.ts
"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";

type LikesResponse = {
  likes: number[];
};

export const getUserLikes = async (): Promise<number[]> => {
  const result = await authenticatedFetch<LikesResponse>("/user/likes", {
    fallbackValue: { likes: [] },
  });

  if (!result.success) {
    console.error("Erro ao buscar likes:", result.error);
    return [];
  }

  return result.data.likes || [];
};