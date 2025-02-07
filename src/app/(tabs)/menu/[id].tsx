// [id] is a dynamic link, feeds in an id
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: 'Details ' + id }} />
      <Text style={styles.title}>Product details for id: {id}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  title: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginTop: 10,
  }
});