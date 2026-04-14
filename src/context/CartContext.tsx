import { createContext, useContext, useMemo, useState } from "react";

type CartItem = {
  _id: string;
  title: string[];
  thumb: string;
  price: number;
  quantity: number;
  status?: string;
  stock?: number;
};

type CartContextValue = {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (book: {
    _id: string;
    title: string[];
    thumb: string;
    price: number;
    status?: string;
    stock?: number;
  }) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "maktabatul_amzad_cart_items";

const CartContext = createContext<CartContextValue | null>(null);

function readInitialCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function persistCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readInitialCart);

  const addToCart: CartContextValue["addToCart"] = (book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === book._id);
      const next = existing
        ? prev.map((item) => (item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...prev, { ...book, quantity: 1 }];

      persistCart(next);
      return next;
    });
  };

  const removeFromCart: CartContextValue["removeFromCart"] = (bookId) => {
    setCart((prev) => {
      const next = prev.filter((item) => item._id !== bookId);
      persistCart(next);
      return next;
    });
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (bookId, quantity) => {
    setCart((prev) => {
      const next = prev
        .map((item) => (item._id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0);
      persistCart(next);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    persistCart([]);
  };

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [cart]);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cart, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
