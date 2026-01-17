export type OrderStatus = "paid" | "completed" | "pending" | "cancelled" | "refunded";

export type StatusConfig = {
  color: string;
  label: string;
};

const statusConfig: Record<string, StatusConfig> = {
  paid: {
    color: "bg-green-100 text-green-800",
    label: "Pago",
  },
  completed: {
    color: "bg-green-100 text-green-800",
    label: "Concluído",
  },
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    label: "Pendente",
  },
  cancelled: {
    color: "bg-red-100 text-red-800",
    label: "Cancelado",
  },
  refunded: {
    color: "bg-purple-100 text-purple-800",
    label: "Reembolsado",
  },
};

const defaultStatus: StatusConfig = {
  color: "bg-gray-100 text-gray-800",
  label: "Desconhecido",
};

export function getStatusColor(status: string): string {
  const normalizedStatus = status?.toLowerCase();
  return statusConfig[normalizedStatus]?.color || defaultStatus.color;
}

export function getStatusLabel(status: string): string {
  const normalizedStatus = status?.toLowerCase();
  return statusConfig[normalizedStatus]?.label || defaultStatus.label;
}

export function getStatusConfig(status: string): StatusConfig {
  const normalizedStatus = status?.toLowerCase();
  return statusConfig[normalizedStatus] || defaultStatus;
}
