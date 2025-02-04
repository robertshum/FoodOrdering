import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import products from '../../../assets/data/products';

// Temp data
const product = products[0];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
}

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
