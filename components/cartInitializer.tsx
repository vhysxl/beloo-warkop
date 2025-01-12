import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useCart } from "@/contexts/cartContext";
import { useCartApi } from "@/hooks/useCartApi";

export function CartInitializer() {
  const { data: session } = useSession();
  const { dispatch } = useCart();
  const { handleGetCart } = useCartApi();

  useEffect(() => {
    if (session) {
      const fetchCart = async () => {
        try {
          const data = await handleGetCart();

          dispatch({
            type: "SET_CART",
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: "SET_CART",
            payload: [],
          });
        }
      };

      fetchCart();
    }
  }, [session]);

  return null;
}

export default CartInitializer;
