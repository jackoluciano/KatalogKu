import { useState } from 'react';
import { ActivityIndicator, View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, TitanOne_400Regular } from '@expo-google-fonts/titan-one';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { DARK_COLORS, LIGHT_COLORS } from './src/theme/colors';

export default function App() {
  const systemScheme = useColorScheme();
  const [themeMode] = useState('light');
  const [fontsLoaded] = useFonts({
    TitanOne_400Regular,
    Inter_400Regular,
    Inter_700Bold,
    TomoTrompaPro: require('./assets/fonts/TOMO-TROMPA-PRO.ttf'),
  });
  const scheme = themeMode === 'system' ? systemScheme : themeMode;
  const colors = scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  if (!fontsLoaded) return <ActivityIndicator />;

  return (
    <SafeAreaProvider>
      <ThemeProvider scheme={scheme}>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <AppNavigator />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
