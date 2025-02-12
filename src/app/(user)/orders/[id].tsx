import { View, Text, StyleSheet, FlatList } from "react-native";
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Order, OrderItem } from '@/types';

// temp data
import orders from '@assets/data/orders';

const OrderDetailsScreen = () => {

  // id of the order
  const { id } = useLocalSearchParams();

  const defaultOrder: Order = { id: 0, created_at: 'null', total: 0, user_id: 'none', status: 'New' };

  // find the order details
  const order: Order = orders.find((o) => o.id.toString() === id) || defaultOrder;

  const listOfOrders: OrderItem[] | undefined = order.order_items;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id.toString()}` }} />
      <OrderListItem order={order}></OrderListItem>
      {listOfOrders &&
        <FlatList
          data={listOfOrders}
          renderItem={({ item }) => <OrderItemListItem order={item}></OrderItemListItem>} />}
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
