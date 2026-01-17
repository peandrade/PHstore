"use client";

import { useCartStore } from "@/store/cart";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const HeaderCartIcon = () => {
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);
  const kits = useCartStore((state) => state.kits);

  const isCartPage = pathname === "/cart" || pathname.startsWith("/cart/");

  const productCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const kitCount = kits.reduce((sum, kit) => sum + kit.quantity, 0);
  const totalItems = productCount + kitCount;

  return (
    <Link href="/cart" className="relative">
      <div
        className={`size-12 border rounded-sm flex justify-center items-center transition-colors ${
          isCartPage
            ? "bg-blue-600 border-blue-600"
            : "border-gray-200 hover:bg-gray-100"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={isCartPage ? "white" : "currentColor"}
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
};
