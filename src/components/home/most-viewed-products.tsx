import { data } from "@/data"
import { ProductSection } from "./product-section"

export const MostViewedProducts = () => {
    return (
        <ProductSection
            title="Produtos mais vistos"
            description="Campeões de vizualização da nossa loja"
            products={data.products}
        />
    )
}