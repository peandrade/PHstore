/**
 * Order status helper functions
 * Provides consistent status colors and labels across the application
 */

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

/**
 * Get the Tailwind CSS classes for order status badge background and text color
 * @param status - Order status string
 * @returns Tailwind CSS classes (e.g., "bg-green-100 text-green-800")
 */
export function getStatusColor(status: string): string {
  const normalizedStatus = status?.toLowerCase();
  return statusConfig[normalizedStatus]?.color || defaultStatus.color;
}

/**
 * Get the human-readable label for order status
 * @param status - Order status string
 * @returns Status label in Portuguese (e.g., "Pago", "Pendente")
 */
export function getStatusLabel(status: string): string {
  const normalizedStatus = status?.toLowerCase();
  return statusConfig[normalizedStatus]?.label || defaultStatus.label;
}

/**
 * Get both color and label for order status
 * @param status - Order status string
 * @returns Object containing color classes and label
 */
export function getStatusConfig(status: string): StatusConfig {
  const normalizedStatus = status?.toLowerCase();
  return statusConfig[normalizedStatus] || defaultStatus;
}
