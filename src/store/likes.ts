import { create } from "zustand";

type LikesState = {
  likes: number[];
  hydrated: boolean;
  setLikes: (likes: number[]) => void;
  addLike: (productId: number) => void;
  removeLike: (productId: number) => void;
  isLiked: (productId: number) => boolean;
  setHydrated: (hydrated: boolean) => void;
  clearLikes: () => void;
};

export const useLikesStore = create<LikesState>((set, get) => ({
  likes: [],
  hydrated: false,

  setLikes: (likes) => set({ likes }),

  addLike: (productId) =>
    set((state) => {
      if (state.likes.includes(productId)) return state;
      return { likes: [...state.likes, productId] };
    }),

  removeLike: (productId) =>
    set((state) => ({
      likes: state.likes.filter((id) => id !== productId),
    })),

  isLiked: (productId) => get().likes.includes(productId),

  setHydrated: (hydrated) => set({ hydrated }),

  clearLikes: () => set({ likes: [] }),
}));
