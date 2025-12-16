"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useQueryString } from "@/hooks/use-querystring";
import { FilterGroup } from "./filter-group";
import { data } from "@/data";
import { ProductItem } from "../product-item";

const techFilters = [
  { id: 'node', label: 'NodeJS' },
  { id: 'react', label: 'React' },
  { id: 'php', label: 'PHP' },
  { id: 'laravel', label: 'Laravel' }
];

const colorFilters = [
  { id: 'blue', label: 'Azul' },
  { id: 'white', label: 'Branco' },
  { id: 'black', label: 'Preto' }
];

export const ProductListFilter = () => {
  const [filterOpened, setFilterOpened] = useState(false);
  const queryString = useQueryString();

  const order = queryString.get("order") ?? "views";
  const techFilter = queryString.get("tech");
  const colorFilter = queryString.get("color");

  const handleSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    queryString.set("order", e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFilterOpened(!filterOpened);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...data.products];

    if (techFilter) {
      const techFilters = techFilter.split('|');
      filtered = filtered.filter(product => {
        const label = product.label.toLowerCase();
        return techFilters.some(tech => label.includes(tech.toLowerCase()));
      });
    }

    if (colorFilter) {
      const colorFilters = colorFilter.split('|');
      filtered = filtered.filter(product => {
        const image = product.image.toLowerCase();
        return colorFilters.some(color => {
          if (color === 'blue') return image.includes('azul');
          if (color === 'white') return image.includes('branca');
          if (color === 'black') return image.includes('preta');
          return false;
        });
      });
    }

    if (order === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (order === 'selling') {
      filtered.reverse();
    }

    return filtered;
  }, [techFilter, colorFilter, order]);

  const hasActiveFilters = techFilter || colorFilter;

  const clearAllFilters = () => {
    queryString.set("tech", "");
    queryString.set("color", "");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="text-3xl">
          <strong>{filteredAndSortedProducts.length}</strong> Produtos
        </div>
        <div className="w-full md:max-w-70 flex flex-row gap-5">
          <select
            value={order}
            onChange={handleSelectChanged}
            className="h-14 flex-1 flex items-center px-6 bg-white border border-gray-200 rounded-sm text-gray-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sort products by"
          >
            <option value="views">Popularidade</option>
            <option value="price">Por preço</option>
            <option value="selling">Mais vendidos</option>
          </select>
          <div
            onClick={() => setFilterOpened(!filterOpened)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-expanded={filterOpened}
            aria-label="Toggle filters"
            className="h-14 flex-1 flex md:hidden items-center justify-center px-6 bg-white border border-gray-200 rounded-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Filtrar por
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex items-center gap-4">
          <span className="text-gray-500">Filtros ativos:</span>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Clear all filters"
          >
            Limpar filtros
          </button>
        </div>
      )}

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <aside
          className={`flex-1 md:max-w-70 ${filterOpened ? "block" : "hidden"} md:block`}
          aria-label="Product filters"
        >
          <FilterGroup id="tech" name="Tecnologias" items={techFilters} />
          <FilterGroup id="color" name="Cores" items={colorFilters} />
        </aside>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((item) => (
              <ProductItem key={item.id} data={item} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 text-center mb-4">
                Tente ajustar os filtros para ver mais resultados.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
