"use server";

import { getServerAuthToken } from "@/libs/server-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const requestRefund = async (orderId: number) => {
  try {
    const token = await getServerAuthToken();

    if (!token) {
      return { error: "Você precisa estar logado" };
    }

    const response = await fetch(`${API_URL}/orders/${orderId}/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || data.error || "Erro ao solicitar reembolso" };
    }

    return { success: true, message: data.message };
  } catch (error: any) {
    console.error("Refund error:", error);
    return { error: error?.message || "Erro ao solicitar reembolso" };
  }
};