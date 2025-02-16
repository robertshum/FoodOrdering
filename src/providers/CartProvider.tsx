import { CartItem, Tables } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';

type Product = Tables<'products'>;

type CartType = {
  items: CartItem[],
  addItem: (product: Product, size: CartItem['size']) => void,
  updateQuantity: (itemId: string, amount: -1 | 1) => void,
  total: number,
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {

  // context states
  const [items, setItems] = useState<CartItem[]>([]);

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items.map((anItem) => {
      if (anItem.id === itemId) {
        anItem.quantity += amount;
      }

      return anItem;
    });

    const filteredItems = updatedItems.filter((item) => item.quantity > 0);

    setItems(filteredItems);
  };

  const addItem = (product: Product, size: CartItem['size']) => {

    //If already in cart, increment quantity
    const foundItem = items.find((item) => item.size === size && item.product === product);

    if (foundItem) {
      updateQuantity(foundItem.id, 1);
      return;
    }

    // ...else create a new item
    const newCartItem: CartItem = {
      id: randomUUID(), //generate id with expo crypto (new UUID)
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const total = items.reduce((sum, item) => {
    return sum += item.product.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// shorthand to create CartContext and then use
export const useCart = () => useContext(CartContext);