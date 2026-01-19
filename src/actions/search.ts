"use server";

import { API_URL } from "@/config/api";

export type SearchProduct = {
  id: number;
  label: string;
  price: number;
  image: string | null;
};

export type SearchKitProduct = {
  id: number;
  label: string;
  price: number;
  quantity: number;
  image: string | null;
};

export type SearchKit = {
  id: number;
  slug: string;
  label: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string | null;
  products: SearchKitProduct[];
};

export type SearchResult = {
  products: SearchProduct[];
  kits: SearchKit[];
  total: number;
};

export const searchProducts = async (
  query: string,
  limit: number = 5
): Promise<SearchResult> => {
  try {
    if (!query || query.trim().length < 2) {
      return { products: [], kits: [], total: 0 };
    }

    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Erro na busca:", response.status);
      return { products: [], kits: [], total: 0 };
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na busca:", error);
    return { products: [], kits: [], total: 0 };
  }
};
