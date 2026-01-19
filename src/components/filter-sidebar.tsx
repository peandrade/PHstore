"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryMetadata } from "@/libs/api";
import { useState } from "react";
import Image from "next/image";

type Props = {
  metadata: CategoryMetadata[];
  currentFilters: Record<string, string>;
  categorySlug: string;
};

export function FilterSidebar({ metadata, currentFilters, categorySlug }: Props) {
  return (
    <div className="space-y-6">
      {metadata.map((meta) => (
        <FilterGroup
          key={meta.id}
          metadata={meta}
          currentValue={currentFilters[meta.id]}
          categorySlug={categorySlug}
        />
      ))}
    </div>
  );
}

type FilterGroupProps = {
  metadata: CategoryMetadata;
  currentValue?: string;
  categorySlug: string;
};

function FilterGroup({ metadata, currentValue, categorySlug }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedValues = currentValue ? currentValue.split("|") : [];

  const handleFilterChange = (valueId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    
    let newValues: string[];
    
    if (checked) {
      newValues = [...selectedValues, valueId];
    } else {
      newValues = selectedValues.filter((v) => v !== valueId);
    }

    if (newValues.length > 0) {
      params.set(metadata.id, newValues.join("|"));
    } else {
      params.delete(metadata.id);
    }

    router.push(`/categories/${categorySlug}?${params.toString()}`);
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-2 font-bold text-left"
      >
        <span>{metadata.name}</span>
        <Image
          src="/assets/ui/arrow-left-s-line.png"
          alt=""
          width={20}
          height={20}
          className={`transition-transform ${isOpen ? "rotate-90" : "-rotate-90"}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {metadata.values.map((value) => (
            <label
              key={value.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(value.id)}
                onChange={(e) => handleFilterChange(value.id, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{value.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}