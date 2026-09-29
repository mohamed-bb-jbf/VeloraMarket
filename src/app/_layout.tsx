import { Stack } from 'expo-router';

// (1) imports جديدة، تحت import الـ Stack
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  useFonts,
} from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// (2) سطر جديد، خارج الدالة
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // (3) كود جديد، داخل الدالة وقبل return
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // هذا الجزء القديم لا تغيّره
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}