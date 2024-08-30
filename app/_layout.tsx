import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as ScreenOrientation from 'expo-screen-orientation';
import { router } from "expo-router";
import { getUser } from "@/components/GetUser";
import { Provider } from "react-redux";
import { store } from "@/redux/store";


SplashScreen.preventAutoHideAsync();  // Prevent auto-hiding of splash screen

export default function RootLayout() {
  const user = getUser();             // Get user information
  const colorScheme = useColorScheme();  // Get device color scheme (dark/light)
  // Load custom fonts
  const [loaded] = useFonts({
    PoppinsRegular: require('@/assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {                   // Effect to set screen orientation
    async function setOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    setOrientation();
  }, []);

 
  useEffect(() => {                   // Effect for font loading and navigation
    if (loaded) {
      // If user is logged in, navigate to main tabs
      if (user) {
        router.navigate("/(tabs)");
      }
      // Hide splash screen after 500ms
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [loaded]);

  // If fonts are not loaded, return null
  if (!loaded) {
    return null;                      // Return null if fonts are not loaded
  }

  // Render main component
  return (
    // ThemeProvider: Provides theme context for navigation
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Redux Provider: Provides Redux store to the app */}
      <Provider store={store}>
        {/* Stack: Defines the navigation structure */}
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(order)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}