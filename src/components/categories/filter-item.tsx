"use client";

import { useQueryString } from "@/hooks/use-querystring";
import { useMemo } from "react";

type Props = {
  groupId: string;
  item: {
    id: string;
    label: string;
  };
};

export const FilterItem = ({ groupId, item }: Props) => {
    const queryString = useQueryString();

    const toggleFilter = (groupId: string, itemId: string) => {
        const queryGroup = queryString.get(groupId);
        let currentFilters = queryGroup ? queryGroup.split('|') : [];

        if(currentFilters.includes(itemId)) {
            currentFilters = currentFilters.filter(i => i !== itemId);
        } else {
            currentFilters.push(itemId);
        }

        queryString.set(groupId, currentFilters.length > 0 ? currentFilters.join('|') : '');
    }

    const hasFilter = useMemo(() => {
        const currentFilters = queryString.get(groupId)?.split('|');
        return currentFilters ? currentFilters.includes(item.id) : false;
    }, [queryString, groupId, item.id]);

  return (
    <div className="flex gap-4 items-center mt-4">
      <input
        type="checkbox"
        className="size-6 cursor-pointer focus:ring-2 focus:ring-blue-500"
        id={`ck-${groupId}-${item.id}`}
        onChange={() => toggleFilter(groupId, item.id)}
        checked={hasFilter}
        aria-label={`Filter by ${item.label}`}
      />
      <label htmlFor={`ck-${groupId}-${item.id}`} className="text-lg text-gray-500 cursor-pointer">
        {item.label}
      </label>
    </div>
  );
};
