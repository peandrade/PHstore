import { getOrderBySessionId } from "@/actions/get-order-by-session";
import { OrderSuccessContent } from "@/components/cart/order-success-content";
import { OrderProcessing } from "@/components/cart/order-processing";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OrderSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params.session_id as string;

  if (!sessionId) {
    redirect("/");
  }

  const order = await getOrderBySessionId(sessionId);

  if (!order) {
    return <OrderProcessing />;
  }

  return <OrderSuccessContent order={order} />;
}

export const metadata = {
  title: "Pedido Confirmado | PHStore",
  description: "Seu pedido foi realizado com sucesso!",
};