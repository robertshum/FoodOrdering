import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Product } from '../types';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image || defaultPizzaImage }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    alignSelf: 'center',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
