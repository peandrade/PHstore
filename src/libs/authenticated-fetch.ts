import { API_URL } from "@/config/api";
import { getServerAuthToken } from "@/libs/server-cookies";

type FetchOptions<T> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  fallbackValue?: T;
};

type AuthFetchResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Authenticated fetch utility for server actions
 * Handles token retrieval, authorization headers, and error responses
 *
 * @param endpoint - API endpoint (e.g., "/orders" or "/products/123")
 * @param options - Fetch options including method, body, and fallback value
 * @returns Promise with success/error result
 */
export async function authenticatedFetch<T>(
  endpoint: string,
  options: FetchOptions<T> = {}
): Promise<AuthFetchResult<T>> {
  const { method = "GET", body, fallbackValue } = options;

  try {
    const token = await getServerAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Você precisa estar logado",
      };
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || errorData.error || `Erro ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: data ?? fallbackValue,
    };
  } catch (error: unknown) {
    console.error(`Authenticated fetch error for ${endpoint}:`, error);
    const message = error instanceof Error ? error.message : "Erro ao conectar com o servidor";

    return {
      success: false,
      error: message,
    };
  }
}
