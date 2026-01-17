"use server";

import { API_URL } from "@/config/api";
import { getServerAuthToken } from "@/libs/server-cookies";

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
  } catch (error: unknown) {
    console.error("Refund error:", error);
    const message = error instanceof Error ? error.message : "Erro ao solicitar reembolso";
    return { error: message };
  }
};