"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderIcon } from "./header-icon";
import { menuItems } from "./menu-config";

interface MobileMenuProps {
  menuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
}

export function MobileMenuButton({ menuOpened, setMenuOpened }: MobileMenuProps) {
  return (
    <div className="md:hidden" onClick={() => setMenuOpened(!menuOpened)}>
      <HeaderIcon
        src="/assets/ui/menu-line.png"
        alt="Menu"
        selected={menuOpened}
        srcSelected="/assets/ui/menu-line-white.png"
      />
    </div>
  );
}

export function MobileMenuItems({ menuOpened }: { menuOpened: boolean }) {
  if (!menuOpened) return null;

  return (
    <div className="md:hidden">
      {menuItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="font-medium text-lg text-gray-500">
              {item.label}
            </div>
            <Image
              src={"/assets/ui/arrow-up-right.png"}
              alt="Ir a categoria"
              width={24}
              height={24}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
