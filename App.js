import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, TitanOne_400Regular } from '@expo-google-fonts/titan-one';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritProvider } from './src/context/FavoritContext';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider } from './src/theme/ThemeContext';
import { DARK_COLORS, LIGHT_COLORS } from './src/theme/colors';

export default function App() {
  const [themeMode, setThemeMode] = useState('light');
  const [fontsLoaded] = useFonts({
    TitanOne_400Regular,
    Inter_400Regular,
    Inter_700Bold,
    TomoTrompaPro: require('./assets/fonts/TOMO-TROMPA-PRO.ttf'),
  });
  const colors = themeMode === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider
        scheme={themeMode}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      >
        <FavoritProvider>
          <CartProvider>
            <AppNavigator />
            <StatusBar style="light" />
          </CartProvider>
        </FavoritProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
