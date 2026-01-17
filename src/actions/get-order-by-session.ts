"use server";

import { API_URL } from "@/config/api";
import { getServerAuthToken } from "@/libs/server-cookies";

export type OrderProduct = {
  id: number;
  label: string;
  price: number;
  quantity: number;
  image: string | null;
};

export type OrderData = {
  id: number;
  status?: string;
  total?: number;
  subtotal?: number;
  shippingCost?: number;
  shippingDays?: number;
  createdAt: string;
  address?: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipcode: string;
    complement?: string;
  };
  products?: OrderProduct[];
};

type OrderItemResponse = {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    label: string;
    price: number;
    image: string | null;
  };
};

type OrderResponse = {
  id: number;
  status: string;
  total: number;
  shippingCost: number;
  shippingDays: number;
  shippingStreet: string;
  shippingNumber: string;
  shippingCity: string;
  shippingState: string;
  shippingZipcode: string;
  shippingComplement?: string;
  createdAt: string;
  orderItems: OrderItemResponse[];
};

export const getOrderBySessionId = async (
  sessionId: string
): Promise<OrderData | null> => {
  if (!sessionId) return null;

  try {
    const sessionResponse = await fetch(
      `${API_URL}/orders/session?session_id=${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!sessionResponse.ok) {
      console.error("Erro ao buscar orderId:", sessionResponse.status);
      return null;
    }

    const sessionData = await sessionResponse.json();
    const orderId = sessionData.orderId as number;

    if (!orderId) {
      console.error("orderId não encontrado na resposta");
      return null;
    }

    const token = await getServerAuthToken();

    if (!token) {
      console.error("Token não encontrado");
      return {
        id: orderId,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
    }

    // 3. Busca os detalhes do pedido
    const orderResponse = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!orderResponse.ok) {
      console.error("Erro ao buscar detalhes do pedido:", orderResponse.status);
      return {
        id: orderId,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
    }

    const orderData = await orderResponse.json();
    const order = orderData.order as OrderResponse;

    const subtotal = order.orderItems?.reduce(
      (sum: number, item: OrderItemResponse) => sum + item.price * item.quantity,
      0
    ) || 0;

    return {
      id: order.id,
      status: order.status,
      total: order.total,
      subtotal: subtotal,
      shippingCost: order.shippingCost,
      shippingDays: order.shippingDays,
      createdAt: order.createdAt,
      address: {
        street: order.shippingStreet,
        number: order.shippingNumber,
        city: order.shippingCity,
        state: order.shippingState,
        zipcode: order.shippingZipcode,
        complement: order.shippingComplement,
      },
      products: order.orderItems?.map((item: OrderItemResponse) => ({
        id: item.product.id,
        label: item.product.label,
        price: item.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
    };
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    return null;
  }
};