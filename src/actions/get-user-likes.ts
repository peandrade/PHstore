// src/actions/get-user-likes.ts
"use server";

import { getServerAuthToken } from "@/libs/server-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const getUserLikes = async (): Promise<number[]> => {
  try {
    const token = await getServerAuthToken();

    if (!token) {
      return [];
    }

    const response = await fetch(`${API_URL}/user/likes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Erro ao buscar likes:", response.status);
      return [];
    }

    const data = await response.json();
    return data.likes || [];
  } catch (error) {
    console.error("Erro ao buscar likes:", error);
    return [];
  }
};