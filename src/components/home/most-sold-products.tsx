import { data } from "@/data"
import { ProductSection } from "./product-section"

export const MostSoldProducts = () => {
    return (
        <ProductSection
            title="Produtos mais vendidos"
            description="Campeões de vendas da nossa loja"
            products={data.products}
        />
    )
}