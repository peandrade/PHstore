"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  data: Product;
};

export const ProductItem = ({ data }: Props) => {
  const link = `/product/${data.id}`;
  const [liked, setLiked] = useState(data.liked);

  const toggleLiked = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLiked(e as unknown as React.MouseEvent);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative bg-gray-50 aspect-square">
        <Link href={link}>
          <Image
            src={data.image}
            alt={data.label}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        <button
          onClick={toggleLiked}
          onKeyDown={handleKeyDown}
          aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={liked}
          className="absolute top-3 right-3 size-8 flex justify-center items-center hover:scale-110 transition-transform focus:outline-none"        >
          <Image
            src={liked ? "/assets/ui/heart-3-fill.png" : "/assets/ui/heart-3-line.png"}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className="p-4"> 
        <Link 
          href={link} 
          className="block text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 min-h-10"
        >
          {data.label}
        </Link>
        
        <div className="mt-2 text-xl font-bold text-blue-600">
          R$ {data.price.toFixed(2)}
        </div>
        
        <div className="mt-1 text-xs text-gray-400">
          Em até 12x no cartão
        </div>
      </div>
    </div>
  );
};