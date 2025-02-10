import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { useColorScheme } from '@/components/useColorScheme';
import { defaultPizzaImage } from '@/components/ProductListItem';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);

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

  const onCreate = () => {

    if (!validateInput()) {
      return;
    }

    console.log('Created: ', name, " ", price);

    resetFields();
  };

  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const bgColor = Colors[colorScheme ?? 'light'].text;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Product' }} />

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
      <Button onPress={onCreate} text='Create' />
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