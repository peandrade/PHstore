import { getRelatedProducts } from "@/libs/api";
import { ProductList } from "../product-list";

type Props = {
  id: number;
};

export async function RelatedProducts({ id }: Props) {
  let products = [];

  try {
    products = await getRelatedProducts(id, 4);
  } catch (error) {
    console.error("Erro ao carregar produtos relacionados:", error);
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl">Você também vai gostar</h3>
      <div className="mt-9">
        <ProductList list={products} />
      </div>
    </div>
  );
}