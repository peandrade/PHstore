"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";

type RetryPaymentResponse = {
  paymentUrl: string;
};

export const retryPayment = async (orderId: number) => {
  const result = await authenticatedFetch<RetryPaymentResponse>(
    `/orders/${orderId}/retry-payment`,
    {
      method: "POST",
      requireAuth: true,
    }
  );

  if (!result.success) {
    return { error: result.error || "Erro ao processar pagamento" };
  }

  return { success: true, paymentUrl: result.data.paymentUrl };
};
