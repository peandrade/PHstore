"use client"

export function OrderBySelect({ currentValue }: { currentValue: string }) {
    return (
      <form>
        <select
          name="orderBy"
          defaultValue={currentValue}
          onChange={(e) => {
            const form = e.target.form;
            if (form) form.submit();
          }}
          className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="discount">Maior desconto</option>
          <option value="price">Menor preço</option>
          <option value="newest">Mais recentes</option>
        </select>
      </form>
    );
  }