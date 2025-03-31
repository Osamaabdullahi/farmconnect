import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFarmConnectStore = create(
  persist(
    (set, get) => ({
      // 🔐 Authentication State
      user: null,
      token: null,
      role: null, // "farmer", "business", "logistics", "admin"
      isAuthenticated: false,

      // 🔑 Auth Actions
      login: (user, token) => {
        set({
          user,
          token,
          role: user.role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
        });
      },

      // 🛒 Cart State
      cart: [],

      // 🛍️ Cart Actions
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "farmconnect-storage", // Save to LocalStorage
      getStorage: () => localStorage,
    }
  )
);

export default useFarmConnectStore;
