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

  const toggleLiked = () => {
    setLiked(!liked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLiked();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-end">
        <div
          onClick={toggleLiked}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={liked}
          className="cursor-pointer size-12 border border-gray-200 rounded-sm flex justify-center items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {liked && (
            <Image
              src={"/assets/ui/heart-3-fill.png"}
              alt="Favorited"
              width={24}
              height={24}
            />
          )}
          {!liked && (
            <Image
              src={"/assets/ui/heart-3-line.png"}
              alt="Not favorited"
              width={24}
              height={24}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Link href={link} className="hover:opacity-80 transition-opacity">
          <Image
            src={data.image}
            alt={`Product image of ${data.label}`}
            width={200}
            height={200}
            className="max-w-full h-48"
          />
        </Link>
      </div>
      <div className="mt-9 text-lg font-bold hover:text-blue-600 transition-colors">
        <Link href={link}>{data.label}</Link>
      </div>
      <div className="text-2xl font-bold text-blue-600">
        R$ {data.price.toFixed(2)}
      </div>
      <div className="mt-5 text-gray-400">Em até 12x no cartão</div>
    </div>
  );
};
