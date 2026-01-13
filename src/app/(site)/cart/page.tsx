// src/app/(site)/cart/page.tsx
import { getCartState } from "@/actions/get-cart-state";
import { getProductsFromList } from "@/actions/get-products-from-list";
import { CartContainer } from "@/components/cart/cart-container";
import { CartEmpty } from "@/components/cart/cart-empty";
import { CartListItem } from "@/types/cart-list-item";

export default async function Page() {
  const { cart: initialCart, kits: initialKits } = await getCartState();

  if (initialCart.length === 0 && initialKits.length === 0) {
    return <CartEmpty />;
  }

  const cartProducts: CartListItem[] = [];
  let productsSubtotal: number = 0;

  if (initialCart.length > 0) {
    const ids = initialCart.map((item) => item.productId);
    const products = await getProductsFromList(ids);

    for (const cartItem of initialCart) {
      const prodIndex = products.findIndex((i) => i.id === cartItem.productId);
      if (prodIndex > -1) {
        const product = products[prodIndex];
        cartProducts.push({
          product: {
            id: product.id,
            label: product.label,
            price: product.price,
            image: product.image,
            liked: product.liked,
          },
          quantity: cartItem.quantity,
        });
        productsSubtotal += product.price * cartItem.quantity;
      }
    }
  }

  const kitsSubtotal = initialKits.reduce(
    (sum, kit) => sum + kit.kitPrice * kit.quantity,
    0
  );
  const totalSubtotal = productsSubtotal + kitsSubtotal;

  return (
    <CartContainer
      initialCartProducts={cartProducts}
      initialSubtotal={totalSubtotal}
      initialKits={initialKits}
    />
  );
}