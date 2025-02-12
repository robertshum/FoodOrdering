import { StyleSheet, View, Text, Image } from 'react-native';
import { OrderItem, Product } from '../types';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { defaultPizzaImage } from '@/components/ProductListItem';

type OrderItemListItemProps = {
  order: OrderItem;
};

const OrderItemListItem = ({ order }: OrderItemListItemProps) => {

  const colorScheme = useColorScheme();
  // const bgColor = Colors[colorScheme ?? 'light'].background;
  const bgColor = '#263744';
  const textColor = Colors[colorScheme ?? 'light'].text;

  const product: Product = order.products;

  return (
    <View style={[styles.container,{backgroundColor:bgColor}]}>
      <Image
        source={{ uri: defaultPizzaImage }}
        style={styles.image} />
      <Text style={[styles.name, { color: textColor }]}>{product.name}</Text>
      <Text style={[styles.cost, { color: textColor }]}>{order.quantity * product.price}</Text>
      <Text style={[styles.size, { color: textColor }]}>{order.size}</Text>
      <Text style={[styles.quantity, { color: textColor }]}>{order.quantity}</Text>
    </View>
  );
};

export default OrderItemListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth: '100%',
    padding: 5,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  image: {
    width: '25%',
    aspectRatio: 1,
  },
  name: {

  },
  cost: {

  },
  size: {

  },
  quantity: {

  },
});