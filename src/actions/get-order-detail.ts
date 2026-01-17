"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";

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

type ApiOrderResponse = {
  order: OrderResponse;
};

export const getOrderDetail = async (
  orderId: number
): Promise<OrderDetail | null> => {
  const result = await authenticatedFetch<ApiOrderResponse>(`/orders/${orderId}`, {
    requireAuth: true,
    cache: "no-store",
  });

  if (!result.success) {
    console.error("Erro ao buscar pedido:", result.error);
    return null;
  }

  const order = result.data.order;

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
};
