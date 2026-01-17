// src/components/header/header-search.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { searchProducts, SearchProduct, SearchKit } from "@/actions/search";
import { Spinner } from "@/components/ui/spinner";

export const HeaderSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [kits, setKits] = useState<SearchKit[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setProducts([]);
      setKits([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      const result = await searchProducts(searchQuery, 5);
      setProducts(result.products);
      setKits(result.kits);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce de 300ms
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  const hasResults = products.length > 0 || kits.length > 0;

  return (
    <div className="relative" ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if (query.trim().length >= 2 && hasResults) {
                setIsOpen(true);
              }
            }}
            style={isLoading ? { paddingRight: "3rem" } : undefined}
            className="border border-gray-200 w-full pl-12 pr-4 py-3 rounded-sm outline-0 focus:border-blue-500 transition-colors [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
            placeholder="O que você procura?"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Spinner className="text-blue-500" />
            </div>
          )}
        </div>
      </form>

      {/* Dropdown de resultados */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[70vh] overflow-y-auto">
          {isLoading && !hasResults && (
            <div className="p-4 text-center text-gray-500">Buscando...</div>
          )}

          {!isLoading && !hasResults && query.trim().length >= 2 && (
            <div className="p-4 text-center text-gray-500">
              <p className="mb-2">Nenhum resultado encontrado para &quot;{query}&quot;</p>
              <p className="text-sm">Tente buscar por outro termo</p>
            </div>
          )}

          {hasResults && (
            <>
              {/* Produtos */}
              {products.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Produtos ({products.length})
                    </span>
                  </div>
                  {products.map((product) => (
                    <Link
                      key={`product-${product.id}`}
                      href={`/product/${product.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="relative w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.label}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            📦
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {product.label}
                        </p>
                        <p className="text-sm text-blue-600 font-semibold">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Kits */}
              {kits.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Kits ({kits.length})
                    </span>
                  </div>
                  {kits.map((kit) => (
                    <Link
                      key={`kit-${kit.id}`}
                      href={`/kits/${kit.slug}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="relative w-12 h-12 bg-blue-50 rounded flex-shrink-0 overflow-hidden">
                        {kit.image ? (
                          <Image
                            src={kit.image}
                            alt={kit.label}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-blue-500 text-xs font-bold">
                            KIT
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {kit.label}
                          </p>
                          <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-semibold">
                            -{kit.discount}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 line-through">
                            R$ {kit.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-blue-600 font-semibold">
                            R$ {kit.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Ver todos os resultados */}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="block p-3 text-center text-blue-600 hover:bg-blue-50 transition-colors font-medium border-t border-gray-200"
              >
                Ver todos os resultados para &quot;{query}&quot;
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};