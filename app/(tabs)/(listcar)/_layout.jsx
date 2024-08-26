import { Stack } from "expo-router";

export default function ListCarLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[id]"
        options={{ headerShown: true, headerTitle: "Detail Mobil" }}
      />
    </Stack>
  );
}
