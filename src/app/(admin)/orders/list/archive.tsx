import { FlatList } from 'react-native';
import { View } from '@/components/Themed';
import OrderListItem from '@/components/OrderListItem';

// temp data
import orders from '@assets/data/orders';
import products from '@assets/data/products';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

export default function OrdersScreen
  () {

  const router = useRouter();

  return (
    <View>
      <Button
        onPress={() => router.dismissAll()}
        text="Back [temp]"
      />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item}></OrderListItem>}
        // numcolumns will (only?) work when each item has flex 1 in the container, which means it will split equally between siblings.
        // if you combine it with maxWidth, each element can not go over it
        // numColumns={1}
        // contentContainerStyle={{ gap: 10, padding: 10 }}
        // columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
