import { View } from '@/components/Themed';
import ProductListItem from '@/components/ProductListItem';
// temp data
import products from '@assets/data/products';

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[0]}></ProductListItem>
      <ProductListItem product={products[1]}></ProductListItem>
    </View>
  );
}

