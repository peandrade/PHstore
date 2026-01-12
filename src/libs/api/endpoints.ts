import api from './client';
import type {
  ProductsResponse,
  ProductResponse,
  CategoryMetadataResponse,
  LoginResponse,
  RegisterResponse,
  AddressesResponse,
  AddAddressResponse,
  Address,
  CartMountResponse,
  ShippingResponse,
  CartFinishResponse,
  CartItem,
  OrdersResponse,
  OrderResponse,
  OrderBySessionResponse,
  BannersResponse,
} from './types';

export async function getProducts(params?: {
  metadata?: string;
  orderBy?: 'views' | 'selling' | 'price';
  limit?: number;
}): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>('/products', { params });
  return data;
}

export async function getProduct(id: number): Promise<ProductResponse> {
  const { data } = await api.get<ProductResponse>(`/product/${id}`);
  return data;
}

export async function getRelatedProducts(
  id: number,
  limit?: number
): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>(`/product/${id}/related`, {
    params: limit ? { limit } : undefined,
  });
  return data;
}

export async function getCategoryMetadata(
  slug: string
): Promise<CategoryMetadataResponse> {
  const { data } = await api.get<CategoryMetadataResponse>(
    `/category/${slug}/metadata`
  );
  return data;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/user/login', {
    email,
    password,
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  return data;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>('/user/register', {
    name,
    email,
    password,
  });
  return data;
}

export async function refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
  const { data } = await api.post<{ accessToken: string }>('/user/refresh', {
    refreshToken,
  });
  return data;
}

export async function logout(): Promise<void> {
  if (typeof window === 'undefined') return;

  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      await api.post('/user/logout', { refreshToken });
    } catch {
    }
  }

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function getAddresses(): Promise<AddressesResponse> {
  const { data } = await api.get<AddressesResponse>('/user/addresses');
  return data;
}

export async function addAddress(
  address: Omit<Address, 'id'>
): Promise<AddAddressResponse> {
  const { data } = await api.post<AddAddressResponse>(
    '/user/addresses',
    address
  );
  return data;
}

export async function mountCart(ids: number[]): Promise<CartMountResponse> {
  const { data } = await api.post<CartMountResponse>('/cart/mount', { ids });
  return data;
}

export async function calculateShipping(
  zipcode: string
): Promise<ShippingResponse> {
  const { data } = await api.get<ShippingResponse>('/cart/shipping', {
    params: { zipcode },
  });
  return data;
}

export async function finishCart(
  cart: CartItem[],
  addressId: number
): Promise<CartFinishResponse> {
  const { data } = await api.post<CartFinishResponse>('/cart/finish', {
    cart,
    addressId,
  });
  return data;
}

export async function getOrders(): Promise<OrdersResponse> {
  const { data } = await api.get<OrdersResponse>('/orders');
  return data;
}

export async function getOrder(id: number): Promise<OrderResponse> {
  const { data } = await api.get<OrderResponse>(`/orders/${id}`);
  return data;
}

export async function getOrderBySessionId(
  sessionId: string
): Promise<OrderBySessionResponse> {
  const { data } = await api.get<OrderBySessionResponse>('/orders/session', {
    params: { session_id: sessionId },
  });
  return data;
}

export async function getBanners(): Promise<BannersResponse> {
  const { data } = await api.get<BannersResponse>('/banners');
  return data;
}

export async function ping(): Promise<{ pong: boolean }> {
  const { data } = await api.get<{ pong: boolean }>('/ping');
  return data;
}
