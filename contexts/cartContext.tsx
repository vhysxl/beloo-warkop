import React, { createContext, useContext, useReducer } from "react";

import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | {
      type: "UPDATE_QUANTITY";
      payload: { product_id: number; quantity: number };
    }
  | { type: "SET_CART"; payload: CartItem[] };

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        items: action.payload,
      };

    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.product_id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product_id === action.payload.product_id
              ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product_id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product_id === action.payload.product_id
            ? {
                ...item,
                quantity: Math.min(action.payload.quantity, item.stock),
              }
            : item,
        ),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
