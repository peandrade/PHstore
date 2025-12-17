import { ImageSlider } from "@/components/product/image-slider";
import { ProductDescription } from "@/components/product/product-description";
import { ProductDetails } from "@/components/product/product-details";
import { RelatedProducts } from "@/components/product/related-products";
import { RelatedProductsSkeleton } from "@/components/product/related-products-skeleton";
import { data } from "@/data";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: number }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <div className="text-gray-500 mb-4">
        <Link href={"/"}>Home</Link> &gt; <Link href={"/"}>Temporario</Link>{" "}
        &gt; <Link href={"/"}> {data.product.label} </Link>
      </div>
      <div className="flex gap-6 md:gap-32">
        <ImageSlider images={data.product.images} />
        <ProductDetails product={data.product} />
      </div>
      <ProductDescription text={data.product.description} />

      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts id={data.product.id} />
      </Suspense>
    </div>
  );
}
