import { getUserOrders } from "@/actions";
import { getServerAuthToken } from "@/libs/server-cookies";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyOrdersPage() {
  const token = await getServerAuthToken();

  if (!token) {
    redirect("/login");
  }

  const orders = await getUserOrders();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "Pago";
      case "completed":
        return "Concluído";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelado";
      case "refunded":
        return "Reembolsado";
      default:
        return status || "Processando";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum pedido encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            Você ainda não realizou nenhuma compra.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Começar a comprar
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/my-orders/${order.id}`}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📦</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Pedido #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p
                      className={`font-semibold ${
                        order.status === "refunded"
                          ? "text-purple-600 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      R$ {order.total.toFixed(2)}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>

                  <svg
                    className="w-5 h-5 text-gray-400 hidden sm:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Continuar comprando
        </Link>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Meus Pedidos | PHStore",
  description: "Acompanhe seus pedidos realizados",
};