import Link from "next/link";
import { getKits } from "@/libs/api";
import { KitList } from "@/components/kits/kit-list";
import { OrderBySelect } from "./order-by-select";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function KitsPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderBy = (params.orderBy as "price" | "discount" | "newest") || "discount";

  const kits = await getKits({ orderBy });

  return (
    <div>
      <div className="text-gray-500 mb-4">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900">Kits</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kits Promocionais</h1>
          <p className="mt-2 text-gray-600">
            Combine produtos e economize! Descontos exclusivos em combos especiais.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <OrderBySelect currentValue={orderBy} />
        </div>
      </div>
      <KitList list={kits} />
    </div>
  );
}

export const metadata = {
  title: "Kits Promocionais | PHStore",
  description: "Confira nossos kits promocionais com descontos exclusivos. Combine camisas e bonés e economize!",
};