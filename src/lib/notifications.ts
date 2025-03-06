import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from "expo-constants";
import { supabase } from "./supabase";
import { Tables } from "@/database.types";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token =
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
      ;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification(
  expoPushToken: Notifications.ExpoPushToken,
  title: string,
  body: string,
) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const getUserToken = async (userId: string | null) => {

  if (!userId) {
    return;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return data?.expo_push_token;
};

export const notifyUserAboutOrderUpdate = async (order: Tables<'orders'>) => {
  const token: string | null | undefined = await getUserToken(order.user_id);

  if (!token) {
    return;
  }

  const pushToken = token as unknown as Notifications.ExpoPushToken;

  const title = `Your order is ${order.status}`;
  const body = 'Food delivery msg body.';
  sendPushNotification(pushToken, title, body);
};