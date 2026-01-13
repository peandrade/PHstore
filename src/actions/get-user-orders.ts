"use server";

import { getServerAuthToken } from "@/libs/server-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type OrderListItem = {
  id: number;
  status: string;
  total: number;
  createdAt: string;
};

export const getUserOrders = async (): Promise<OrderListItem[]> => {
  try {
    const token = await getServerAuthToken();

    if (!token) {
      return [];
    }

    const response = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Erro ao buscar pedidos:", response.status);
      return [];
    }

    const data = await response.json();
    return data.orders || [];
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return [];
  }
};