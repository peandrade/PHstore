"use server";

import { API_URL } from "@/config/api";
import { getServerAuthToken } from "@/libs/server-cookies";

export const retryPayment = async (orderId: number) => {
  try {
    const token = await getServerAuthToken();

    if (!token) {
      return { error: "Você precisa estar logado" };
    }

    const response = await fetch(`${API_URL}/orders/${orderId}/retry-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || data.error || "Erro ao processar pagamento" };
    }

    return { success: true, paymentUrl: data.paymentUrl };
  } catch (error: unknown) {
    console.error("Retry payment error:", error);
    const message = error instanceof Error ? error.message : "Erro ao processar pagamento";
    return { error: message };
  }
};