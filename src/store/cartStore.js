import { create } from 'zustand';

// Use this store to manage the global cart state.
export const useCartStore = create((set) => ({
  // --- STATE ---
  cart: [],
  itemCount: 0,

  // --- ACTIONS ---
  addItemToCart: (item) =>
    set((state) => {
      // Find the item in the cart if it already exists
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

      let newCart;
      let newItemCount;

      if (existingItem) {
        // If item exists, update its quantity
        newCart = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        newItemCount = state.itemCount + 1;
      } else {
        // If item is new, add it to the cart with quantity 1
        newCart = [...state.cart, { ...item, quantity: 1 }];
        newItemCount = state.itemCount + 1;
      }

      return { cart: newCart, itemCount: newItemCount };
    }),

  removeItemFromCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      
      let newCart;
      let newItemCount = state.itemCount;
      
      if (!existingItem) {
        return state; // Item not found, no change
      }
      
      if (existingItem.quantity === 1) {
        // If quantity is 1, remove the item completely
        newCart = state.cart.filter((cartItem) => cartItem.id !== item.id);
        newItemCount--;
      } else {
        // If quantity is more than 1, decrease the quantity
        newCart = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        newItemCount--;
      }
      
      return { cart: newCart, itemCount: newItemCount };
    }),

  clearCart: () => set({ cart: [], itemCount: 0 }),
}));