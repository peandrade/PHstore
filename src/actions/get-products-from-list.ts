"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ProductFromList = {
  id: number;
  label: string;
  price: number;
  image: string | null;
  liked: boolean;
};

type ProductApiResponse = {
  id: number;
  label: string;
  price: number;
  image: string | null;
  liked?: boolean;
};

export const getProductsFromList = async (
  ids: (string | number)[]
): Promise<ProductFromList[]> => {
  if (ids.length === 0) return [];

  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Erro ao buscar produtos:", response.status);
      return [];
    }

    const data = await response.json();
    const allProducts = data.products as ProductApiResponse[];

    const numericIds = ids.map((id) => Number(id));
    const filteredProducts = allProducts
      .filter((product) => numericIds.includes(product.id))
      .map((product) => ({
        id: product.id,
        label: product.label,
        price: product.price,
        image: product.image,
        liked: product.liked ?? false,
      }));

    return filteredProducts;
  } catch (error) {
    console.error("Erro ao buscar produtos do carrinho:", error);
    return [];
  }
};