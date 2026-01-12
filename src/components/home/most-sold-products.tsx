import { ProductSection } from "./product-section"
import { getMostSoldProducts } from "@/libs/api";

export const MostSoldProducts = async () => {
    const products = await getMostSoldProducts(8);
    return (
        <ProductSection
            title="Produtos mais vendidos"
            description="Campeões de vendas da nossa loja"
            products={products}
        />
    )
}