import { FlatList } from 'react-native';
import { View } from '@/components/Themed';
import ProductListItem from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

// temp data
import products from '@assets/data/products';

export default function MenuScreen() {

  const router = useRouter();
  
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
