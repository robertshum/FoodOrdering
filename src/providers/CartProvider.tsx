import { CartItem, Tables } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';
import { useInsertOrder } from '@/api/orders';
import { useRouter } from 'expo-router';

type Product = Tables<'products'>;

type CartType = {
  items: CartItem[],
  addItem: (product: Product, size: CartItem['size']) => void,
  updateQuantity: (itemId: string, amount: -1 | 1) => void,
  total: number,
  checkout: () => void,
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  total: 0,
  checkout: () => { },
});

const CartProvider = ({ children }: PropsWithChildren) => {

  const { mutate: inserOrder } = useInsertOrder();
  const router = useRouter();

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

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    console.warn('checkout');
    inserOrder({ total }, {
      onSuccess: (data) => {
        clearCart();
        router.push(`/(user)/orders/${data.id}`);
      }
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// shorthand to create CartContext and then use
export const useCart = () => useContext(CartContext);