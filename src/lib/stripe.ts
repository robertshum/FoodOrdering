import { Alert } from "react-native";
import { supabase } from "./supabase";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
  });

  if (data) {
    return data;
  }

  Alert.alert('error fetching payment intent edge f(n): ', error);
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  const data = await fetchPaymentSheetParams(amount);

  const { paymentIntent, publishableKey } = data;

  if (!paymentIntent || !publishableKey) {
    return;
  }

  await initPaymentSheet({
    merchantDisplayName: 'notRealPizzaPlace',
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: 'Jane Doe',
    },
  });
};

// open the modal
export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }

  return true;
};