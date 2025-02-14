// [id] is a dynamic link, feeds in an id
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const bgColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const product = products.find((p) => p.id.toString() === id);
  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return <Text>Pizza Not Found!</Text>
  }

  return (
    <View style={styles.container}>

      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Pressable
              onPressIn={() => router.push(`/(admin)/menu/create?id=${id}`)}
              style={{ padding: 10 }}
            >
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{
                  // marginRight: 10,
                  // marginBottom: -5,
                  // width: 35,
                  // height: 35,
                }}
              />
            </Pressable>
          )
        }} />

      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  title: {
    color: Colors.light.tint,
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});