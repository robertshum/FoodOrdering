import { StyleSheet, Image, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Tables } from '../types';
import { Link } from 'expo-router';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {

  return (
    <Link href={`./menu/${product.id}`} asChild>
      {/* Pressables very similar to view, but it has press events.  Can combine it in conjunction with <Link> tag as parent with (asChild) */}
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode='contain'
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    alignSelf: 'auto',
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
