import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { OrderStatus, OrderStatusList } from '@/types';
import Colors from "@/constants/Colors";

import { useOrderDetails, useUpdateOrder } from "@/api/orders";

const OrderDetailsScreen = () => {

  // id of the order
  const { id } = useLocalSearchParams();

  const { data: order, isLoading, error } = useOrderDetails(id);

  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = (status: OrderStatus) => {
    updateOrder({ idString: id, newFields: { status } });
  };

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

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem order={item}></OrderItemListItem>}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order}></OrderListItem>}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>

        )}
      />
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
