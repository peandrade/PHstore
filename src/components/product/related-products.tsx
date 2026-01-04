import { data } from "@/data";
import { ProductList } from "../product-list";

type Props = {
    id: number;
}

export const RelatedProducts = ({ id }: Props) => {
    const relatedProducts = data.products
        .filter(product => product.id !== id)
        .slice(0, 4);

    return (
        <div className="mt-10">
            <h3 className="text-2xl">Você também vai gostar</h3>
            <div className="mt-9">
                <ProductList list={relatedProducts}/>
            </div>
        </div>
    )
}