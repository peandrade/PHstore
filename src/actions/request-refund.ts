"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";

type RefundResponse = {
  message?: string;
};

export const requestRefund = async (orderId: number) => {
  const result = await authenticatedFetch<RefundResponse>(
    `/orders/${orderId}/refund`,
    {
      method: "POST",
    }
  );

  if (!result.success) {
    return { error: result.error || "Erro ao solicitar reembolso" };
  }

  return { success: true, message: result.data.message };
};
