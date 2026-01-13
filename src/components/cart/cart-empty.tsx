import Link from "next/link";

export const CartEmpty = () => {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <div className="text-8xl mb-6">🛒</div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Seu carrinho está vazio
      </h1>
      
      <p className="text-gray-600 mb-8">
        Parece que você ainda não adicionou nenhum produto ao carrinho.
        <br />
        Que tal explorar nossos produtos e kits promocionais?
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ver Produtos
        </Link>
        <Link
          href="/kits"
          className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Ver Kits Promocionais
        </Link>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">💡 Dica</h3>
        <p className="text-sm text-gray-600">
          Confira nossos <Link href="/kits" className="text-blue-600 hover:underline">kits promocionais</Link> e 
          economize até 30% combinando produtos!
        </p>
      </div>
    </div>
  );
};