import { ActivityIndicator, FlatList, Text } from 'react-native';
import { View } from '@/components/Themed';
import ProductListItem from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { useProductList } from '@/api/products';

export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList();

  // TODO remove eventually
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products.</Text>;
  }

  return (
    <View>
      <Button
        onPress={() => router.dismissAll()}
        text="Back [temp]"
      />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item}></ProductListItem>}
        // numcolumns will (only?) work when each item has flex 1 in the container, which means it will split equally between siblings.
        // if you combine it with maxWidth, each element can not go over it
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
