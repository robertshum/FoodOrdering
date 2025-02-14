import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { OrderItem, OrderStatusList } from '@/types';

// temp data
import orders from '@assets/data/orders';
import Colors from "@/constants/Colors";

const OrderDetailsScreen = () => {

  // id of the order
  const { id } = useLocalSearchParams();

  // const defaultOrder: Order = { id: 0, created_at: 'null', total: 0, user_id: 'none', status: 'New' };

  // find the order details
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text>Order not found!</Text>
  }

  const listOfOrders: OrderItem[] | undefined = order.order_items;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id.toString()}` }} />

      {listOfOrders ?
        <FlatList
          data={listOfOrders}
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
                    onPress={() => console.warn('Update status')}
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
        : null}
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
