import { API_URL } from "@/config/api";
import { CACHE, IMAGES } from "@/config/constants";
import { Product, ProductComplete } from "@/types/product";
import { Banner } from "@/types/banner";

const PLACEHOLDER_IMAGE = IMAGES.PLACEHOLDER_PATH;

export async function getBanners(): Promise<Banner[]> {
  const response = await fetch(`${API_URL}/banners`, {
    next: { revalidate: CACHE.REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar banners");
  }

  const data = await response.json();

  return data.banners.map((banner: { img: string; link: string }, index: number) => ({
    img: banner.img,
    link: banner.link,
    alt: `Banner promocional ${index + 1}`,
  }));
}

type ApiProduct = {
  id: number;
  label: string;
  image: string | null;
  price: number;
  liked: boolean;
};

type ApiCategory = {
  id: number;
  name: string;
  slug: string;
};

type ApiProductDetail = {
  id: number;
  label: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

type ProductFilters = {
  metadata?: string;
  orderBy?: "views" | "selling" | "price";
  limit?: number;
};

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const params = new URLSearchParams();

  if (filters?.metadata) params.append("metadata", filters.metadata);
  if (filters?.orderBy) params.append("orderBy", filters.orderBy);
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const queryString = params.toString();
  const url = `${API_URL}/products${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: CACHE.REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar produtos");
  }

  const data = await response.json();

  return data.products.map((product: ApiProduct): Product => ({
    id: product.id,
    label: product.label,
    price: product.price,
    liked: product.liked,
    image: product.image ?? PLACEHOLDER_IMAGE,
  }));
}

export type ProductWithCategory = {
  product: ProductComplete;
  category: ApiCategory;
};

export async function getProduct(id: number): Promise<ProductWithCategory | null> {
  const response = await fetch(`${API_URL}/product/${id}`, {
    next: { revalidate: CACHE.REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Falha ao carregar produto");
  }

  const data: { product: ApiProductDetail; category: ApiCategory } = await response.json();

  const product: ProductComplete = {
    id: data.product.id,
    label: data.product.label,
    price: data.product.price,
    description: data.product.description,
    liked: false,
    images: data.product.images.length > 0 
      ? data.product.images 
      : [PLACEHOLDER_IMAGE],
  };

  return {
    product,
    category: data.category,
  };
}

export async function getRelatedProducts(
  productId: number,
  limit: number = 4
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/product/${productId}/related?limit=${limit}`,
    { next: { revalidate: CACHE.REVALIDATE_SECONDS } }
  );

  if (!response.ok) {
    throw new Error("Falha ao carregar produtos relacionados");
  }

  const data = await response.json();

  return data.products.map((product: ApiProduct): Product => ({
    id: product.id,
    label: product.label,
    price: product.price,
    liked: product.liked,
    image: product.image ?? PLACEHOLDER_IMAGE,
  }));
}

export type MetadataValue = {
  id: string;
  label: string;
};

export type CategoryMetadata = {
  id: string;
  name: string;
  values: MetadataValue[];
};

export type CategoryWithMetadata = {
  category: ApiCategory;
  metadata: CategoryMetadata[];
};

export async function getCategoryWithMetadata(
  slug: string
): Promise<CategoryWithMetadata | null> {
  const response = await fetch(`${API_URL}/category/${slug}/metadata`, {
    next: { revalidate: CACHE.REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Falha ao carregar categoria");
  }

  const data = await response.json();
  return {
    category: data.category,
    metadata: data.metadata,
  };
}

export type CategoryProductsParams = {
  categorySlug: string;
  metadata?: Record<string, string>;
  orderBy?: "views" | "selling" | "price";
  limit?: number;
};

export async function getProductsByCategory(
  params: CategoryProductsParams
): Promise<Product[]> {
  const searchParams = new URLSearchParams();

  searchParams.append("categorySlug", params.categorySlug);

  if (params.metadata && Object.keys(params.metadata).length > 0) {
    searchParams.append("metadata", JSON.stringify(params.metadata));
  }

  if (params.orderBy) searchParams.append("orderBy", params.orderBy);
  if (params.limit) searchParams.append("limit", params.limit.toString());

  const queryString = searchParams.toString();
  const url = `${API_URL}/products?${queryString}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar produtos");
  }

  const data = await response.json();

  return data.products.map((product: ApiProduct): Product => ({
    id: product.id,
    label: product.label,
    price: product.price,
    liked: product.liked,
    image: product.image ?? PLACEHOLDER_IMAGE,
  }));
}

export async function getMostViewedProducts(limit?: number): Promise<Product[]> {
  return getProducts({ orderBy: "views", limit });
}

export async function getMostSoldProducts(limit?: number): Promise<Product[]> {
  return getProducts({ orderBy: "selling", limit });
}

export type KitProduct = {
  id: number;
  label: string;
  price: number;
  quantity: number;
  image: string | null;
};

export type Kit = {
  id: number;
  slug: string;
  label: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string | null;
  products: KitProduct[];
};

export type KitDetail = Kit & {
  products: (KitProduct & {
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      slug: string;
    };
  })[];
};

// ============ FUNÇÕES DE KIT ============
export async function getKits(params?: {
  limit?: number;
  orderBy?: "price" | "discount" | "newest";
}): Promise<Kit[]> {
  const searchParams = new URLSearchParams();

  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.orderBy) searchParams.append("orderBy", params.orderBy);

  const queryString = searchParams.toString();
  const url = `${API_URL}/kits${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: CACHE.REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar kits");
  }

  const data = await response.json();
  return data.kits;
}

export async function getKitBySlug(slug: string): Promise<KitDetail | null> {
  const response = await fetch(`${API_URL}/kit/slug/${slug}`, {
    next: { revalidate: CACHE.REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Falha ao carregar kit");
  }

  const data = await response.json();
  return data.kit;
}

export async function getKitById(id: number): Promise<KitDetail | null> {
  const response = await fetch(`${API_URL}/kit/${id}`, {
    next: { revalidate: CACHE.REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Falha ao carregar kit");
  }

  const data = await response.json();
  return data.kit;
}