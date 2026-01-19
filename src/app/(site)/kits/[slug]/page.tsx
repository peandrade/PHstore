import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getKitBySlug } from "@/libs/api";
import { formatPrice } from "@/utils/formatters";
import { AddKitToCartButton } from "@/components/kits/add-kit-to-cart-button";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function KitPage({ params }: Props) {
  const { slug } = await params;

  const kit = await getKitBySlug(slug);

  if (!kit) {
    notFound();
  }

  const savings = kit.originalPrice - kit.price;

  const productsForCart = kit.products.map((product) => ({
    id: product.id,
    label: product.label,
    quantity: product.quantity,
    price: product.price,
  }));

  return (
    <div>
      <div className="text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <Link href="/kits" className="hover:text-gray-700">
          Kits
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900">{kit.label}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gray-50 rounded-lg p-6">
          <div
            className={`grid gap-4 ${
              kit.products.length === 1
                ? "grid-cols-1"
                : kit.products.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
            }`}
          >
            {kit.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-4 aspect-square relative group"
              >
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.label}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            -{kit.discount}% OFF
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{kit.label}</h1>

          <p className="text-gray-600 mb-6">{kit.description}</p>

          <div className="rounded-lg p-6 mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-blue-600">
                {formatPrice(kit.price)}
              </span>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(kit.originalPrice)}
              </span>
            </div>
            <div className="text-green-600 font-semibold">
              Você economiza {formatPrice(savings)}
            </div>
            <div className="text-gray-500 text-sm mt-2">
              Em até 12x de {formatPrice(kit.price / 12)} no cartão
            </div>
          </div>

          <AddKitToCartButton
            kitId={kit.id}
            kitSlug={kit.slug}
            kitLabel={kit.label}
            kitPrice={kit.price}
            kitOriginalPrice={kit.originalPrice}
            products={productsForCart}
            className="w-full py-4 px-8 text-lg mb-6"
            showIcon
          />

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              O que está incluso ({kit.products.length} itens)
            </h3>
            <div className="space-y-4">
              {kit.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-16 h-16 bg-white rounded shrink-0">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.label}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {product.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      Quantidade: {product.quantity}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 line-through text-sm">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const kit = await getKitBySlug(slug);

  if (!kit) {
    return { title: "Kit não encontrado" };
  }

  return {
    title: `${kit.label} | PHStore`,
    description: kit.description,
  };
}
