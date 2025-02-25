import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';
import { Platform } from 'react-native';  // Import Platform module
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for web

// Web storage fallback (localStorage)
const webStorage = typeof window !== 'undefined' ? window.localStorage : null;

// Custom storage adapter for SecureStore (mobile), AsyncStorage (web), and localStorage (if running in browser)
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (Platform.OS === 'web') {
      return webStorage?.getItem(key);  // Use localStorage for web
    }
    return SecureStore.getItemAsync(key);  // Use SecureStore for mobile
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web') {
      return webStorage?.setItem(key, value);  // Use localStorage for web
    }
    return SecureStore.setItemAsync(key, value);  // Use SecureStore for mobile
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web') {
      return webStorage?.removeItem(key);  // Use localStorage for web
    }
    return SecureStore.deleteItemAsync(key);  // Use SecureStore for mobile
  },
};

// Safe to share key and URL
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
