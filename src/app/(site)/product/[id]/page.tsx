import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct } from "@/libs/api";
import { ImageSlider } from "@/components/product/image-slider";
import { ProductDetails } from "@/components/product/product-details";
import { ProductDescription } from "@/components/product/product-description";
import { RelatedProducts } from "@/components/product/related-products";
import { ProductGridSkeleton } from "@/components/ui/product-grid-skeleton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const data = await getProduct(productId);

  if (!data) {
    notFound();
  }

  const { product, category } = data;

  return (
    <div>
      <div className="text-sm text-gray-500 mb-6">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>{category.name}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.label}</span>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <ImageSlider images={product.images} />
        </div>
        <div className="md:w-1/2">
          <ProductDetails product={product} />
        </div>
      </div>
      <ProductDescription text={product.description} />
      <Suspense fallback={<ProductGridSkeleton />}>
        <RelatedProducts id={productId} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return { title: "Produto não encontrado" };
  }

  const data = await getProduct(productId);

  if (!data) {
    return { title: "Produto não encontrado" };
  }

  return {
    title: `${data.product.label} | PHStore`,
    description: data.product.description,
  };
}