import { Product } from "@/types/product"
import { ProductItem } from "./product-item";

type Props = {
    list: Product[];
}

export const ProductList = ({ list }: Props) => {
    if (list.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Nenhum produto encontrado
                </h3>
                <p className="text-gray-500 text-center">
                    Não há produtos disponíveis no momento.
                </p>
            </div>
        );
    }

    return(
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {list.map(item => (
                <ProductItem key={item.id} data={item} />
            ))}
        </section>
    )
}