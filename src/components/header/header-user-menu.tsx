// src/components/header/header-user-menu.tsx
"use client";

import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useLikesStore } from "@/store/likes";
import { clearAuthCookie } from "@/actions/clear-auth-cookie";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export const HeaderUserMenu = () => {
  const router = useRouter();
  const { token, hydrated, clearToken } = useAuthStore((state) => state);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearLikes = useLikesStore((state) => state.clearLikes);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = hydrated && typeof token === "string" && token.length > 0;

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await clearAuthCookie();
    clearToken();
    clearCart();
    clearLikes();
    setIsOpen(false);
    router.push("/");
  };

  // Skeleton enquanto hidrata
  if (!hydrated) {
    return (
      <div className="size-12 border border-gray-200 rounded-sm flex justify-center items-center bg-gray-50 animate-pulse" />
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Botão do usuário */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`size-12 border rounded-sm flex justify-center items-center transition-colors ${
          isOpen
            ? "bg-blue-600 border-blue-600"
            : "border-gray-200 hover:bg-gray-100"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={isOpen ? "white" : "currentColor"}
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-14 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {isLoggedIn ? (
            <>
              {/* Menu para usuário logado */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Minha Conta</p>
                    <p className="text-xs text-green-600">● Conectado</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <Link
                  href="/my-orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="text-gray-700">Meus Pedidos</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-red-600">Sair da conta</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Menu para usuário não logado */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <p className="font-semibold text-gray-800">Bem-vindo!</p>
                <p className="text-sm text-gray-500">
                  Entre ou cadastre-se para acompanhar seus pedidos
                </p>
              </div>

              <div className="p-4 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Entrar
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 px-4 border-2 border-gray-300 text-gray-700 text-center font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Criar conta
                </Link>
              </div>

              <div className="px-4 pb-4">
                <p className="text-xs text-gray-400 text-center">
                  Ao entrar, você concorda com nossos termos de uso
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};