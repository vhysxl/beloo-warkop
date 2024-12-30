export function useCartApi() {
  const handleAddToCart = async (product_id: number, quantity: number) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id, quantity }),
    });

    return response.json();
  };

  const handleGetCart = async () => {
    const response = await fetch("/api/cart", {
      method: "GET",
    });

    if (response.ok) {
      return response.json();
    }
  };

  const handleQuantityChange = async (product_id: number, quantity: number) => {
    const response = await fetch(`/api/cart/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    return response.json();
  };

  const handleCartDeletion = async (product_id: number) => {
    const response = await fetch(`/api/cart/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  return {
    handleAddToCart,
    handleGetCart,
    handleQuantityChange,
    handleCartDeletion,
  };
}
