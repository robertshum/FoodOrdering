import { View, Text, StyleSheet } from "react-native";
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Order, OrderItem, OrderStatus } from '@/types';
// temp data
import orders from '@assets/data/orders';

const OrderDetailsScreen = () => {

  // id of the order
  const { id } = useLocalSearchParams();

  const defaultOrder: Order = { id: 0, created_at: 'null', total: 0, user_id: 'none', status: 'New' };

  // find the order details
  const order: Order = orders.find((o) => o.id.toString() === id) || defaultOrder;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id.toString()}` }} />
      <OrderListItem order={order}></OrderListItem>
      <Text style={{ color: 'red' }}>Order Detail Screen for: {id}</Text>
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
