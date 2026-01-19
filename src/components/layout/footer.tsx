import Image from "next/image";
import Link from "next/link";
import FooterInfo from "../footer/footer-info";
import { menuItems } from "./menu-config";

export const Footer = () => {
  return (
    <footer>
      <div className="bg-black bg-linear-to-b from-transparent to-gray-50/60 dark:border-gray-800 dark:to-white/5 text-white">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-16 md:py-10 border-b border-gray-700">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src={"/assets/ui/logo-white.png"}
                alt="PHStore logo"
                width={143}
                height={48}
              />
            </Link>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col md:flex-row gap-8 items-center">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <FooterInfo />
        </div>
      </div>
    </footer>
  );
};