import { searchProducts } from "@/actions/search";
import Link from "next/link";
import { ProductItem } from "@/components/product-item";
import { SearchKitCard } from "@/components/search/search-kit-card";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q: query } = await searchParams;

  if (!query || query.trim().length < 2) {
    return (
      <div className="py-16 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          O que você está procurando?
        </h1>
        <p className="text-gray-600 mb-8">
          Digite pelo menos 2 caracteres para buscar produtos e kits.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ver todos os produtos
        </Link>
      </div>
    );
  }

  const result = await searchProducts(query, 50);
  const { products, kits } = result;
  const totalResults = products.length + kits.length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Resultados para &quot;{query}&quot;
        </h1>
        <p className="text-gray-600">
          {totalResults === 0
            ? "Nenhum resultado encontrado"
            : `${totalResults} resultado${totalResults !== 1 ? "s" : ""} encontrado${totalResults !== 1 ? "s" : ""}`}
        </p>
      </div>

      {totalResults === 0 ? (
        <div className="py-12 text-center">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Não encontramos nada para &quot;{query}&quot;
          </h2>
          <p className="text-gray-600 mb-8">Tente buscar por outro termo ou explore nossos produtos.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Produtos
            </Link>
            <Link
              href="/kits"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Ver Kits
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {kits.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  KITS
                </span>
                {kits.length} encontrado{kits.length !== 1 ? "s" : ""}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {kits.map((kit) => (
                  <SearchKitCard key={kit.id} kit={kit} />
                ))}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Produtos ({products.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductItem
                    key={product.id}
                    data={{
                      id: product.id,
                      label: product.label,
                      price: product.price,
                      image: product.image || "/assets/placeholder.png",
                      liked: false,
                    }}
                    showCartButton={true}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
