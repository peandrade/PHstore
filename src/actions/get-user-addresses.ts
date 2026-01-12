"use server";

import { Address } from "@/types/address";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const getUserAddresses = async (token: string): Promise<Address[]> => {
  if (!token || typeof token !== "string" || token.length === 0) {
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/user/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Erro ao buscar endereços:", response.status);
      return [];
    }

    const data = await response.json();

    if (data && Array.isArray(data.addresses)) {
      return data.addresses;
    }

    if (Array.isArray(data)) {
      return data;
    }

    console.error("Resposta inesperada do servidor:", data);
    return [];
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    return [];
  }
};