"use server";

import { getServerAuthToken } from "@/libs/server-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type OrderDetailProduct = {
  id: number;
  label: string;
  price: number;
  quantity: number;
  image: string | null;
};

export type OrderDetail = {
  id: number;
  status: string;
  total: number;
  shippingCost: number;
  shippingDays: number;
  createdAt: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipcode: string;
    complement?: string;
  };
  products: OrderDetailProduct[];
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

export const getOrderDetail = async (
  orderId: number
): Promise<OrderDetail | null> => {
  try {
    const token = await getServerAuthToken();

    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Erro ao buscar pedido:", response.status);
      return null;
    }

    const data = await response.json();
    const order = data.order as OrderResponse;

    return {
      id: order.id,
      status: order.status,
      total: order.total,
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
      products: order.orderItems.map((item) => ({
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