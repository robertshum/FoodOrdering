import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { OrderItem } from '@/types';

// temp data
import orders from '@assets/data/orders';
import { useOrderDetails } from "@/api/orders";

const OrderDetailsScreen = () => {

  // id of the order
  const { id } = useLocalSearchParams();

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id.toString()}` }} />
      <OrderListItem order={order}></OrderListItem>

      <FlatList
        data={null}
        renderItem={({ item }) => <OrderItemListItem order={item}></OrderItemListItem>} />
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
