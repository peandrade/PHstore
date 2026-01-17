import { Banners } from "@/components/home/banners";
import { MostSoldProducts } from "@/components/home/most-sold-products";
import { MostViewedProducts } from "@/components/home/most-viewed-products";
import { ProductGridSkeleton } from "@/components/ui/product-grid-skeleton";
import { data } from "@/data";
import Image from "next/image";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Banners list={data.banners} />
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 md:mt-12">
        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image
              src={"/assets/ui/truck-line.png"}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Frete Grátis</div>
            <div className="text-gray-500">Para todo o Nordeste.</div>
          </div>
        </div>
        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image
              src={"/assets/ui/discount-percent-line.png"}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Muitas Ofertas</div>
            <div className="text-gray-500">Ofertas imbatíveis.</div>
          </div>
        </div>
        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image
              src={"/assets/ui/arrow-left-right-line.png"}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Troca fácil</div>
            <div className="text-gray-500">No período de 30 dias.</div>
          </div>
        </div>
      </div>
      <Suspense fallback={<ProductGridSkeleton showDescription />}> <MostViewedProducts /></Suspense>
      <Suspense fallback={<ProductGridSkeleton showDescription />}> <MostSoldProducts /></Suspense>
    </div>
  );
}
