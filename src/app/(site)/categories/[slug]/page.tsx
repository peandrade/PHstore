import { ProductListFilterServer } from "@/components/product-list-server";
import { getCategoryWithMetadata, getProductsByCategory } from "@/libs/api";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const filters = await searchParams;

  const categoryData = await getCategoryWithMetadata(slug);

  if (!categoryData) {
    notFound();
  }

  const { category, metadata } = categoryData;

  const metadataFilters: Record<string, string> = {};
  
  for (const meta of metadata) {
    const filterValue = filters[meta.id];
    if (filterValue && typeof filterValue === "string") {
      metadataFilters[meta.id] = filterValue;
    }
  }

  const orderBy = (filters.orderBy as "views" | "selling" | "price") || "views";

  const products = await getProductsByCategory({
    categorySlug: slug,
    metadata: Object.keys(metadataFilters).length > 0 ? metadataFilters : undefined,
    orderBy,
  });

  return (
    <div>
      <div className="text-gray-500 mb-4">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900">{category.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

      <ProductListFilterServer
        products={products}
        metadata={metadata}
        currentFilters={metadataFilters}
        currentOrderBy={orderBy}
        categorySlug={slug}
      />
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categoryData = await getCategoryWithMetadata(slug);

  if (!categoryData) {
    return { title: "Categoria não encontrada" };
  }

  return {
    title: `${categoryData.category.name} | PHStore`,
    description: `Confira nossa coleção de ${categoryData.category.name.toLowerCase()}`,
  };
}