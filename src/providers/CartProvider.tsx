import { CartItem, Tables } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';
import { useInsertOrder } from '@/api/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '@/api/order-items';
import { initialisePaymentSheet, openPaymentSheet } from '@/lib/stripe';

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

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
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

  const checkout = async () => {

    // * 100 to move pennies
    // floor to get rid of decimal
    await initialisePaymentSheet(Math.floor(total * 100));;

    const payed = await openPaymentSheet();

    if (!payed) {
      return;
    }

    insertOrder({ total }, {
      onSuccess: saveOrderItems,
    });
  };

  const saveOrderItems = (order: Tables<'orders'>) => {

    // need to add quantity, size, product ID.
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
    }));

    insertOrderItems(orderItems, {
      onSuccess: () => {
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
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