"use client"

import Image from "next/image"
import { FilterItem } from "./filter-item"
import { useState } from "react"

type FilterOption = {
    id: string;
    label: string;
}

type Props = {
    id: string;
    name: string;
    items: FilterOption[];
}

export const FilterGroup = ({ id, name, items }: Props) => {
    const [opened, setOpened] = useState(true);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpened(!opened);
        }
    };

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div className="flex-1 font-bold text-xl">{name}</div>
                <div
                    onClick={() => setOpened(!opened)}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-expanded={opened}
                    aria-label={`${opened ? 'Collapse' : 'Expand'} ${name} filters`}
                    className="size-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <Image
                        src={'/assets/ui/arrow-left-s-line.png'}
                        alt={opened ? 'Collapse' : 'Expand'}
                        width={24}
                        height={24}
                        className={`${opened ? '-rotate-90' : 'rotate-90'} transition-all`}
                    />
                </div>
            </div>
            <div
                className={`overflow-hidden ${opened ? 'max-h-screen' : 'max-h-0'} transition-all duration-300`}
                aria-hidden={!opened}
            >
                {items.map(item => (
                    <FilterItem key={item.id} groupId={id} item={item} />
                ))}
            </div>
        </div>
    )
}