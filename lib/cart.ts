export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  quantity: number;
}

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: any) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== productId);
  saveCart(newCart);
  return newCart;
};

export const updateQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity = Math.max(0, quantity);
    if (existingItem.quantity === 0) {
      return removeFromCart(productId);
    }
  }
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  saveCart([]);
};
