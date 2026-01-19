"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";

export type OrderListItem = {
  id: number;
  status: string;
  total: number;
  createdAt: string;
};

type OrdersResponse = {
  orders: OrderListItem[];
};

export const getUserOrders = async (): Promise<OrderListItem[]> => {
  const result = await authenticatedFetch<OrdersResponse>("/orders", {
    fallbackValue: { orders: [] },
  });

  if (!result.success) {
    console.error("Erro ao buscar pedidos:", result.error);
    return [];
  }

  return result.data.orders || [];
};