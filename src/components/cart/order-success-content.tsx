"use client";

import { OrderData } from "@/actions/get-order-by-session";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

type Props = {
  order: OrderData;
};

export const OrderSuccessContent = ({ order }: Props) => {
  const cartStore = useCartStore((state) => state);

  useEffect(() => {
    cartStore.clearCart();
    cartStore.clearShipping();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status?: string) => {
    if (!status) return "Processando";
    
    switch (status.toLowerCase()) {
      case "paid":
        return "Pago";
      case "completed":
        return "Concluído";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pedido Confirmado!
        </h1>
        <p className="text-gray-600">
          Obrigado pela sua compra. Você receberá um e-mail com os detalhes do
          pedido.
        </p>
      </div>

      {/* Card do Pedido */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        {/* Header do Card */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-gray-500 text-sm">Número do pedido</span>
              <p className="font-bold text-lg">#{order.id}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-gray-500 text-sm">Status</span>
              <p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Produtos */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Itens do Pedido ({order.products?.length || 0})
          </h3>
          <div className="space-y-4">
            {order.products?.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.label}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      📦
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {product.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qtd: {product.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    R$ {(product.price * product.quantity).toFixed(2)}
                  </p>
                  {product.quantity > 1 && (
                    <p className="text-sm text-gray-500">
                      R$ {product.price.toFixed(2)} cada
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo de Valores */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>R$ {order.subtotal?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frete</span>
              <span>R$ {order.shippingCost?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-blue-600">
                R$ {order.total?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Informações de Entrega */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Endereço de Entrega
        </h3>
        {order.address && (
          <div className="text-gray-600">
            <p>
              {order.address.street}, {order.address.number}
              {order.address.complement && ` - ${order.address.complement}`}
            </p>
            <p>
              {order.address.city} - {order.address.state}
            </p>
            <p>CEP: {order.address.zipcode}</p>
          </div>
        )}
        {order.shippingDays && (
          <p className="mt-4 text-sm text-green-600 font-medium">
            📦 Previsão de entrega: até {order.shippingDays} dias úteis
          </p>
        )}
      </div>

      {/* Data do Pedido */}
      <div className="text-center text-gray-500 text-sm mb-8">
        Pedido realizado em {formatDate(order.createdAt)}
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/my-orders"
          className="px-8 py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Ver Meus Pedidos
        </Link>
        <Link
          href="/"
          className="px-8 py-3 border border-gray-300 text-center rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Continuar Comprando
        </Link>
      </div>
    </div>
  );
};