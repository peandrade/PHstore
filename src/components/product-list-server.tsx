import { Product } from "@/types/product";
import { CategoryMetadata } from "@/libs/api";
import { ProductList } from "@/components/product-list";
import { FilterSidebar } from "./filter-sidebar";
import { OrderBySelect } from "./order-by-select";

type Props = {
  products: Product[];
  metadata: CategoryMetadata[];
  currentFilters: Record<string, string>;
  currentOrderBy: string;
  categorySlug: string;
};

export function ProductListFilterServer({
  products,
  metadata,
  currentFilters,
  currentOrderBy,
  categorySlug,
}: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl">
          <span className="font-bold">{products.length}</span> Produtos
        </div>
        <OrderBySelect currentValue={currentOrderBy} categorySlug={categorySlug} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <FilterSidebar
            metadata={metadata}
            currentFilters={currentFilters}
            categorySlug={categorySlug}
          />
        </aside>

        <main className="flex-1">
          {products.length > 0 ? (
            <ProductList list={products} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 text-center">
                Tente remover alguns filtros para ver mais produtos.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}