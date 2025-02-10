import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {

  const router = useRouter();

  // issues using onPress on android and using link wrapper around pressable.
  // had to use router with onPressIn
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Admin Menu',
          headerRight: () => (
            <Pressable
              onPressIn={() => router.push("/(admin)/menu/create")}
              style={{ padding: 10 }}
            >
              <FontAwesome
                name="plus-square-o"
                size={25}
                color={Colors.light.tint}
                style={{
                  // marginRight: 10,
                  // marginBottom: -5,
                  // width: 35,
                  // height: 35,
                }}
              />
            </Pressable>
          )
        }} />



    </Stack>
  );
}