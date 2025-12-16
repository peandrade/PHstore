import { Product } from "@/types/product";
import { ProductList } from "../product-list";

type Props = {
    title: string;
    description: string;
    products: Product[];
    loading?: boolean;
};

export const ProductSection = ({ title, description, products, loading = false }: Props) => {
    return (
        <div className="mt-10">
            <h2 className="text-2xl text-center md:text-left">{title}</h2>
            <p className="text-gray-500 text-center md:text-left">{description}</p>

            <div className="mt-9">
                <ProductList list={products} />
            </div>
        </div>
    );
};
