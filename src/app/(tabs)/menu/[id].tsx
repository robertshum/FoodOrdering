// [id] is a dynamic link, feeds in an id
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const bgColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn('adding to cart, size: ', selectedSize);
    console.warn('adding to cart, pizza: ', product?.name);
  };

  if (!product) {
    return <Text>Pizza Not Found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image} />

      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
        Select Size
      </Text>

      <View style={styles.sizes}>
        {sizes.map((aSize, i) => (
          //{/* we can pass in conditional styles using [] inside style */}
          <Pressable
            onPress={() => { setSelectedSize(aSize); }}
            style={[styles.size, {
              backgroundColor: selectedSize === aSize ? 'gainsboro' : bgColor,
            }]} key={i}>
            <Text style={[styles.sizeText, {
              color: selectedSize === aSize ? 'Blue Orchid' : textColor,
            }]}>{aSize}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button onPress={addToCart} text="Add to cart" />
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
  selectSizeTitle: {

  },
  price: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  }
});