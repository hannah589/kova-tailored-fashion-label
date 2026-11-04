// useCartStore.js
//store global state and function for cart
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
//wrap persist middleware to save state automatically in localstorage. To survive page refresh.

//create a zustand hook/store
export const useCartStore = create(
  persist(
    (set, get) => ({
      //set: to change state
      //get: read current state value
      cartItems: [],
      isCartOpen: false,

      //set state
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      
      //cart functions
      //pass current state as arg
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === product.id);
        let newItems;

        if (existingItem) {
          // If item already exists, increment its quantity
          newItems = state.cartItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // // If it's a brand new item, append it with quantity 1
          newItems = [...state.cartItems, { ...product, quantity: 1 }];
        }

        return { 
          cartItems: newItems, 
          // Automatically opens the slide-out panel on add. 
          //** comment out the bottom code, for no cart summary, slide out.
          isCartOpen: true 
        };
      }),

      // Remove item from cart
      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== productId)
      })),

      // Adjust quantity up/down
      updateQuantity: (productId, amount) => set((state) => ({
        cartItems: state.cartItems.map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
      })),

      //  calculate sum of all products
      getSubtotal: () => {
        const items = get().cartItems;
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    }),
    {
      //payload
      name: 'shopping-cart-storage',
      partialize: (state) => ({ 
        cartItems: state.cartItems, 
      }),
    }
  )
);
