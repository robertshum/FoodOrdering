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
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Image
        source={{ uri: defaultPizzaImage }}
        style={styles.image} />
      <View style={styles.midContainer}>
        <Text style={[styles.name, { color: textColor }]}>{product.name}</Text>
        <View style={styles.priceSizeContainer}>
          <Text style={styles.cost}>${order.quantity * product.price}</Text>
          <Text style={[styles.size, { color: textColor }]}>Size: {order.size}</Text>
        </View>

      </View>


      <View style={styles.quantContainer}>
        <Text style={[styles.quantity, { color: textColor }]}>{order.quantity}</Text>
      </View>

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
  midContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  quantContainer: {
    marginLeft: 'auto',
    alignSelf: 'center',
    marginHorizontal: 5,

  },
  priceSizeContainer: {
    flexDirection: 'row',
    gap: 5
  },
  image: {
    width: '25%',
    aspectRatio: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  cost: {
    color: '#0076ff',
    fontWeight: '600',
  },
  size: {

  },
  quantity: {
    fontWeight: 'bold',
    fontSize: 18
  },
});