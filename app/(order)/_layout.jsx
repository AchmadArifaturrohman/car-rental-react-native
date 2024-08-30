import { Stack } from "expo-router";
import { View } from "react-native";
import Constants from "expo-constants";

export default function () {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: true, headerTitle: "Pembayaran" }}
        />
      </Stack>
    </View>
  );
}
