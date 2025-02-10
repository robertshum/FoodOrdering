import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import Button from '@/components/Button';

const SignUpPage = () => {

  const router = useRouter();

  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const bgColor = Colors[colorScheme ?? 'light'].text;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    console.log('sign up pressed.');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      {/* Email */}
      <Text style={[styles.label, { color: textColor }]}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { backgroundColor: bgColor }]}
        placeholder="name@email.com"
      >
      </TextInput>


      {/* PW */}
      <Text style={[styles.label, { color: textColor }]}>Password</Text>
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { backgroundColor: bgColor }]}
        placeholder="********"
      >
      </TextInput>

      <Button onPress={onSignUp} text='Create account' />
      <Text onPress={() => router.replace('/(auth)/sign-in')} style={[styles.signinLabel, { color: textColor }]}>Sign in</Text>
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
  signinLabel: {
    fontSize: 16,
    marginVertical: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
});

export default SignUpPage;