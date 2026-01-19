import { getMostViewedProducts } from "@/libs/api"
import { ProductSection } from "./product-section"

export const MostViewedProducts = async () => {
    const products = await getMostViewedProducts(8);
    return (
        <ProductSection
            title="Produtos mais vistos"
            description="Campeões de vizualização da nossa loja"
            products={products}
        />
    )
}