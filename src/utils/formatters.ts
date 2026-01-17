/**
 * Format a number as Brazilian Real currency
 * @param value - The numeric value to format
 * @returns Formatted currency string (e.g., "R$ 99.90")
 */
export function formatPrice(value: number): string {
  return `R$ ${value.toFixed(2)}`;
}

/**
 * Format a number as Brazilian Real currency with full locale support
 * @param value - The numeric value to format
 * @returns Formatted currency string using Intl (e.g., "R$ 99,90")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Format a date string to Brazilian format
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "15/01/2025")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

/**
 * Format a date string to Brazilian format with time
 * @param dateString - ISO date string
 * @returns Formatted datetime (e.g., "15/01/2025 14:30")
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
}
