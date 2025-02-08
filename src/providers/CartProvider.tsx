import { CartItem, Product } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartType = {
  items: CartItem[],
  addItem: (product: Product, size: CartItem['size']) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
});

const CartProvider = ({ children }: PropsWithChildren) => {

  // context states
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem['size']) => {
    console.log("add item: ", product, " ", size);

    // TODO if already in cart, increment quantity

    const newCartItem: CartItem = {
      id: '1', //generate id?
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// shorthand to create CartContext and then use
export const useCart = () => useContext(CartContext);