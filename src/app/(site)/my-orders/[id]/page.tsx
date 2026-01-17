import { getOrderDetail } from "@/actions";
import { getServerAuthToken } from "@/libs/server-cookies";
import { formatDateTime, formatPrice } from "@/utils/formatters";
import { getStatusColor, getStatusLabel } from "@/utils/order-helpers";
import Image from "next/image";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { RefundButton } from "@/components/order/refund-button";
import { RetryPaymentButton } from "@/components/order/retry-payment-button";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const token = await getServerAuthToken();

  if (!token) {
    redirect("/login");
  }

  const order = await getOrderDetail(parseInt(id));

  if (!order) {
    notFound();
  }

  const subtotal = order.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/my-orders"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para pedidos
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Pedido #{order.id}
          </h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusLabel(order.status)}
          </span>
        </div>
        <p className="text-gray-500 mt-1">
          Realizado em {formatDateTime(order.createdAt)}
        </p>
      </div>

      {/* Aviso de Pagamento Pendente */}
      {order.status === "pending" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Pagamento Pendente</p>
              <p>
                Este pedido está aguardando o pagamento. Clique no botão abaixo
                para continuar com o pagamento.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Aviso de Reembolso */}
      {order.status === "refunded" && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            <div className="text-sm text-purple-800">
              <p className="font-medium mb-1">Pedido Reembolsado</p>
              <p>
                O valor deste pedido foi estornado. O reembolso pode levar até 7
                dias úteis para aparecer no seu método de pagamento original.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Produtos */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-900">
            Itens do Pedido ({order.products.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-6">
              <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.label}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                    📦
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{product.label}</p>
                <p className="text-sm text-gray-500">
                  Quantidade: {product.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  {formatPrice(product.price)} cada
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatPrice(product.price * product.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo de Valores */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Frete</span>
            <span>{formatPrice(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span
              className={
                order.status === "refunded"
                  ? "text-purple-600 line-through"
                  : "text-blue-600"
              }
            >
              {formatPrice(order.total)}
            </span>
          </div>
          {order.status === "refunded" && (
            <div className="flex justify-between text-sm text-purple-600">
              <span>Valor reembolsado</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Endereço de Entrega */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
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
        </h2>
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
        {order.shippingDays && order.status !== "refunded" && (
          <p className="mt-4 text-sm text-green-600 font-medium">
            📦 Previsão de entrega: até {order.shippingDays} dias úteis
          </p>
        )}
      </div>

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-4">
        <RetryPaymentButton orderId={order.id} status={order.status} />
        <RefundButton orderId={order.id} status={order.status} />
        <Link
          href="/my-orders"
          className="flex-1 px-6 py-3 border border-gray-300 text-center rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Voltar para pedidos
        </Link>
        <Link
          href="/"
          className="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Pedido #${id} | PHStore`,
    description: `Detalhes do pedido #${id}`,
  };
}