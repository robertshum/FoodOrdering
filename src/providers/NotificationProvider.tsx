import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { ExpoPushToken } from 'expo-notifications';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {

  const { profile } = useAuth();

  const [expoPushToken, setExpoPushToken] =
    useState<ExpoPushToken | undefined>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: ExpoPushToken | undefined) => {
    setExpoPushToken(newToken);

    if (!newToken) {
      return;
    }

    //update the token in the db
    await supabase
      .from('profiles')
      .update({ expo_push_token: newToken.data })
      .eq('id', profile.id);
  };

  useEffect(() => {
    console.warn('notification prov. init');
    registerForPushNotificationsAsync().then((token) =>
      savePushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  console.log(notification);
  console.log(expoPushToken);

  return <>{children}</>;
};

export default NotificationProvider;