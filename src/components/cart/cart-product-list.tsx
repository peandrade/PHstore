import { CartListItem } from "@/types/cart-list-item";
import { CartProductItem } from "./cart-product-item";

type Props = {
  initialList: CartListItem[];
};

export const CartProductList = ({ initialList }: Props) => {
  return (
    <div className="space-y-4">
      {initialList.map((item) => (
        <CartProductItem key={item.product.id} item={item} />
      ))}
    </div>
  );
};
