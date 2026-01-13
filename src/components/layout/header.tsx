// src/components/header/header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeaderIcon } from "./header-icon";
import { MobileMenuButton, MobileMenuItems } from "./mobile-menu";
import { HeaderSearch } from "./header-search";
import { menuItems } from "./menu-config";
import { HeaderUserMenu } from "../header/header-user-menu";
import { HeaderCartIcon } from "../header/header-cart-icon";

export function Header() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="bg-black text-white text-center p-5">
        <strong>FRETE GRÁTIS</strong> para todo o Nordeste nas compras acima de
        R$ 199,00. <strong>APROVEITA!</strong>
      </div>
      <div className="w-full max-w-6xl mx-auto p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="w-32">
            <Link href={"/"}>
              <Image
                src="/assets/ui/logo-black.png"
                alt="PHstore"
                width={120}
                height={40}
              />
            </Link>
          </div>
          <div className="flex-1">
            <div className="w-full hidden md:flex items-center px-6 gap-6">
              <ul className="flex gap-10 font-medium text-gray-600">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link key={item.label} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden md:block flex-1 max-w-md">
            <HeaderSearch />
          </div>
          <div className="flex gap-4">
            <HeaderUserMenu />
            <HeaderCartIcon />
            <MobileMenuButton
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
          </div>
        </div>
        <MobileMenuItems menuOpened={menuOpened} />
        <div className="pt-6 md:hidden">
          <HeaderSearch />
        </div>
      </div>
    </header>
  );
}