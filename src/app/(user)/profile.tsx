import { View, Text, Button, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

const ProfileScreen = () => {

  const { session, sessionLoading } = useAuth();

  console.log('Rendering ProfileScreen.');

  if (sessionLoading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    console.log('Redirecting to sign-in');
    return <Redirect href={'/sign-in'} />;
  }

  const title = 'sign out';

  return (
    <View>
      <Text>Profile</Text>
      <Button
        title={title}
        onPress={async () => {
          console.log('Signing out...');
          await supabase.auth.signOut();
          console.log('Sign out complete.');
        }}
      />
    </View>
  );
};

export default ProfileScreen;