"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentValue: string;
  categorySlug: string;
};

const orderOptions = [
  { value: "views", label: "Popularidade" },
  { value: "selling", label: "Mais vendidos" },
  { value: "price", label: "Menor preço" },
];

export function OrderBySelect({ currentValue, categorySlug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", e.target.value);
    router.push(`/categories/${categorySlug}?${params.toString()}`);
  };

  return (
    <select
      value={currentValue}
      onChange={handleChange}
      className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {orderOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}