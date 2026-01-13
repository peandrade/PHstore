// src/store/cart.ts
import { CartItem } from "@/types/cart-item";
import { create } from "zustand";

export type KitCartItem = {
  kitId: number;
  kitSlug: string;
  kitLabel: string;
  kitPrice: number;
  kitOriginalPrice: number;
  quantity: number;
  products: {
    productId: number;
    label: string;
    quantity: number;
  }[];
};

type CartState = {
  cart: CartItem[];
  kits: KitCartItem[];
  shippingZipcode: string;
  shippingCost: number;
  shippingDays: number;
  selectedAddressId: number | null;
  addItem: (cartItem: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  addKit: (kit: Omit<KitCartItem, "quantity">) => void;
  removeKit: (kitId: number) => void;
  updateKitQuantity: (kitId: number, quantity: number) => void;
  setShippingZipcode: (zipcode: string) => void;
  setShippingCost: (cost: number) => void;
  setShippingDays: (days: number) => void;
  setSelectedAddressId: (id: number | null) => void;
  clearCart: () => void;
  clearShipping: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  kits: [],
  shippingZipcode: "",
  shippingCost: 0,
  shippingDays: 0,
  selectedAddressId: null,

  addItem: ({ productId, quantity }) =>
    set((state) => {
      const existing = state.cart.find((item) => item.productId === productId);
      let newCart;
      if (existing) {
        newCart = state.cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { productId, quantity }];
      }
      return { cart: newCart };
    }),

  removeItem: (productId) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.productId !== productId);
      return { cart: newCart };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      return { cart: newCart };
    }),

  addKit: (kit) =>
    set((state) => {
      const existingIndex = state.kits.findIndex((k) => k.kitId === kit.kitId);
      
      if (existingIndex > -1) {
        // Kit já existe, incrementa quantidade
        const newKits = state.kits.map((k, index) =>
          index === existingIndex ? { ...k, quantity: k.quantity + 1 } : k
        );
        return { kits: newKits };
      }
      
      // Kit novo, adiciona com quantidade 1
      return { kits: [...state.kits, { ...kit, quantity: 1 }] };
    }),

  removeKit: (kitId) =>
    set((state) => {
      const newKits = state.kits.filter((kit) => kit.kitId !== kitId);
      return { kits: newKits };
    }),

  updateKitQuantity: (kitId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        // Remove se quantidade for 0 ou menos
        return { kits: state.kits.filter((kit) => kit.kitId !== kitId) };
      }
      const newKits = state.kits.map((kit) =>
        kit.kitId === kitId ? { ...kit, quantity } : kit
      );
      return { kits: newKits };
    }),

  setShippingZipcode: (zipcode) => set({ shippingZipcode: zipcode }),
  setShippingCost: (cost) => set({ shippingCost: cost }),
  setShippingDays: (days) => set({ shippingDays: days }),
  setSelectedAddressId: (id) => set({ selectedAddressId: id }),

  clearCart: () =>
    set({
      cart: [],
      kits: [],
      shippingZipcode: "",
      shippingCost: 0,
      shippingDays: 0,
      selectedAddressId: null,
    }),

  clearShipping: () =>
    set({
      shippingZipcode: "",
      shippingCost: 0,
      shippingDays: 0,
      selectedAddressId: null,
    }),
}));