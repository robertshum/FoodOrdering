import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { useColorScheme } from '@/components/useColorScheme';
import { defaultPizzaImage } from '@/components/ProductListItem';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';

const CreateProductScreen = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  // on mount, load the product's initial information for editing
  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetFields = () => {
    setPrice('');
    setName('');
  };

  const validateInput = () => {

    setErrors('');

    if (!name) {
      setErrors('name is required.');
      return false;
    }

    if (!price) {
      setErrors('price is required.');
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors('price is not a number.');
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
      return;
    }

    // create
    onCreate();
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }

    //Update in DB
    const updatedProduct = {
      id,
      name,
      price: parseFloat(price),
      image,
    };

    updateProduct(updatedProduct, {
      onSuccess: () => {
        resetFields();
        router.back();
      },
    });
  };

  const onCreate = () => {

    if (!validateInput()) {
      return;
    }

    console.log('Created: ', name, " ", price);

    //Save in DB
    const newProduct = {
      name,
      price: parseFloat(price),
      image
    };

    insertProduct(newProduct, {
      onSuccess: () => {
        resetFields();
        router.back();
      }
    });
    resetFields();
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      }
    ]);
  };

  const onDelete = () => {

    // loading
    setIsDeleting(true);

    deleteProduct(id, {
      onSuccess: () => {
        resetFields();

        //we don't reset setIsDeleting because it will navigate somewhere

        console.warn('routing to (admin) after delete!');
        router.replace('/(admin)');
      },
      onError: () => {
        setIsDeleting(false);
        Alert.alert('There was an error deleting this item.');
      },
    });
  };

  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const bgColor = Colors[colorScheme ?? 'light'].text;


  if (isDeleting) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }}></ActivityIndicator>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />

      {/* Pizza Image and select txt */}
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text
        onPress={pickImage}
        style={[styles.textButton, { color: textColor }]}>Select Image</Text>

      {/* Name */}
      <Text style={[styles.label, { color: textColor }]}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={[styles.input, { backgroundColor: bgColor }]}
        placeholder="Name"
      >
      </TextInput>

      {/* Name */}
      <Text style={[styles.label, { color: textColor }]}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={[styles.input, { backgroundColor: bgColor }]}
        placeholder="$10.99"
        keyboardType='numeric'
      >
      </TextInput>

      <Text style={{ color: 'red' }}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
      {isUpdating ?
        <Text style={[styles.textButton, { color: 'red' }]} onPress={confirmDelete}>Delete Product</Text>
        : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    fontSize: 16,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  }
});

export default CreateProductScreen;