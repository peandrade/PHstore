export interface Product {
  id: number;
  label: string;
  price: number;
  image: string;
  liked?: boolean;
  description?: string;
  categoryId?: number;
  images?: string[];
}

export interface ProductsResponse {
  error: string | null;
  products: Product[];
}

export interface ProductResponse {
  error: string | null;
  product: Product;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface MetadataValue {
  id: string;
  label: string;
}

export interface Metadata {
  id: string;
  name: string;
  values: MetadataValue[];
}

export interface CategoryMetadataResponse {
  error: string | null;
  category: Category;
  metadata: Metadata[];
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  error: string | null;
  user: User;
}

export interface Address {
  id: number;
  zipcode: string;
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  complement?: string;
}

export interface AddressesResponse {
  error: string | null;
  addresses: Address[];
}

export interface AddAddressResponse {
  error: string | null;
  address: Address;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartProduct {
  id: number;
  label: string;
  price: number;
  image: string;
}

export interface CartMountResponse {
  error: string | null;
  products: CartProduct[];
}

export interface ShippingResponse {
  zipcode: string;
  cost: number;
  days: number;
  city: string;
  state: string;
}

export interface CartFinishResponse {
  error: string | null;
  url: string;
}

export type OrderStatus = 'pending' | 'paid' | 'expired' | 'failed';

export interface Order {
  id: number;
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface OrderDetail extends Order {
  shippingCost: number;
  shippingDays: number;
  shippingZipcode: string;
  shippingStreet: string;
  shippingNumber: string;
  shippingCity: string;
  shippingState: string;
  shippingCountry: string;
  shippingComplement?: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: CartProduct;
}

export interface OrdersResponse {
  error: string | null;
  orders: Order[];
}

export interface OrderResponse {
  error: string | null;
  order: OrderDetail;
}

export interface OrderBySessionResponse {
  error: string | null;
  orderId: number;
}

export interface Banner {
  img: string;
  link: string;
}

export interface BannersResponse {
  error: string | null;
  banners: Banner[];
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}
