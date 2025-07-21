import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/components/useColorScheme';
import { ArchiveProvider } from '@/components/ArchiveContext';
import { AuthProvider } from '@/components/AuthContext';
import { InterestsProvider } from '@/components/InterestsContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  // const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Restore login as first screen (remove fast access)
      // router.replace('/(tabs)/explore');
    }
    if (error) throw error;
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ArchiveProvider>
        <InterestsProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack initialRouteName='login'>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="PostDetailScreen" options={{ title: 'Post Details' }} />
              <Stack.Screen name="CreateWKPostScreen" options={{ title: 'Create WK-Post' }} />
              <Stack.Screen name="profile" options={{ title: 'Profile' }} />
              <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              <Stack.Screen name="login" options={{ presentation: 'modal' }} />
              <Stack.Screen name="archivedMessages" options={{ presentation: 'modal' }} />
            </Stack>
          </ThemeProvider>
        </InterestsProvider>
      </ArchiveProvider>
    </AuthProvider>
  );
}
