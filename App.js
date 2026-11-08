import { useState } from 'react';
import {
  ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Switch, Text, View, useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, TitanOne_400Regular } from '@expo-google-fonts/titan-one';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import HeaderBar from './src/components/HeaderBar';
import Button from './src/components/Button';
import Card from './src/components/Card';
import CustomInput from './src/components/CustomInput';
import { DARK_COLORS, LIGHT_COLORS } from './src/theme/colors';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

export default function App() {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('light');
  const [fontsLoaded] = useFonts({
    TitanOne_400Regular, Inter_400Regular, Inter_700Bold,
    TomoTrompaPro: require('./assets/fonts/TOMO-TROMPA-PRO.ttf'),
  });
  const scheme = themeMode === 'system' ? systemScheme : themeMode;
  const colors = scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  if (!fontsLoaded) return <ActivityIndicator style={styles.loading} color={colors.primary} />;

  return (
    <ThemeProvider scheme={scheme}>
      <CatalogApp themeMode={themeMode} setThemeMode={setThemeMode} />
    </ThemeProvider>
  );
}

function CatalogApp({ themeMode, setThemeMode }) {
  const colors = useTheme();
  const [page, setPage] = useState('home');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  function openProduct(product) {
    setSelected(product);
    setPage('detail');
  }

  function toggleFavorite(product) {
    setFavorites((current) => current.some((item) => item.title === product.title)
      ? current.filter((item) => item.title !== product.title)
      : [...current, product]);
  }

  return (
    <SafeAreaProvider>
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        {page === 'home' && (
          <HomeScreen onProduct={openProduct} />
        )}
        {page === 'favorites' && (
          <FavoritesPage favorites={favorites} onProduct={openProduct} />
        )}
        {page === 'profile' && (
          <ProfilePage themeMode={themeMode} setThemeMode={setThemeMode} />
        )}
        {page === 'detail' && selected && (
          <DetailScreen product={selected} isFavorite={favorites.some((item) => item.title === selected.title)}
            onFavorite={() => toggleFavorite(selected)} onBack={() => setPage('home')} />
        )}
        {page !== 'detail' && (
          <BottomNav page={page} setPage={setPage} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

function FavoritesPage({ favorites, onProduct }) {
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 4 : width >= 500 ? 3 : 2;

  return (
    <>
      <HeaderBar title="FAVORIT" subtitle="Produk tersimpan" />
      <FlatList
        data={favorites}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={favorites.length ? styles.grid : undefined}
        renderItem={({ item }) => (
          <Card {...item} columns={numColumns} onPress={() => onProduct(item)} />
        )}
        ListEmptyComponent={<EmptyState text="Belum ada produk favorit" />}
      />
    </>
  );
}

function ProfilePage({ themeMode, setThemeMode }) {
  const colors = useTheme();
  const dark = themeMode === 'dark';
  return (
    <>
      <HeaderBar title="PROFIL" subtitle="Lengkapi data akunmu" />
      <ScrollView contentContainerStyle={styles.profile}>
        <CustomInput label="Nama Lengkap" defaultValue="Budi Santoso" />
        <CustomInput label="Email" defaultValue="budi@" error="Format email tidak valid" />
        <CustomInput label="No. HP" defaultValue="0812" error="No. HP diawali 08, total 10–13 digit" />
        <CustomInput label="Password" defaultValue="••••••" secureTextEntry error="Password minimal 8 karakter" />
        <Button title="Simpan Profil" onPress={() => {}} />
        <View style={[styles.themeRow, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <View>
            <Text style={[styles.themeTitle, { color: colors.text }]}>Mode gelap</Text>
            <Text style={[styles.themeHint, { color: colors.muted }]}>
              {themeMode === 'system' ? 'Mengikuti pengaturan perangkat' : dark ? 'Aktif' : 'Nonaktif'}
            </Text>
          </View>
          <Switch value={dark} onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
            trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.onPrimary} />
        </View>
        {themeMode !== 'system' && (
          <Pressable onPress={() => setThemeMode('system')} style={styles.systemMode}>
            <Text style={[styles.systemText, { color: colors.primary }]}>Gunakan tema perangkat</Text>
          </Pressable>
        )}
      </ScrollView>
    </>
  );
}

function EmptyState({ text }) {
  const colors = useTheme();
  return <Text style={[styles.empty, { color: colors.muted }]}>{text}</Text>;
}

function BottomNav({ page, setPage }) {
  const colors = useTheme();
  const items = [
    ['home', 'Beranda', 'home-outline'],
    ['favorites', 'Favorit', 'heart-outline'],
    ['profile', 'Profil', 'person-outline'],
  ];
  return (
    <View style={[styles.nav, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      {items.map(([key, label, icon]) => (
        <Pressable key={key} style={styles.navItem} onPress={() => setPage(key)}>
          <Ionicons name={page === key ? icon.replace('-outline', '') : icon} size={24}
            color={page === key ? colors.primary : colors.muted} />
          <Text style={[styles.navLabel, { color: page === key ? colors.primary : colors.muted }]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loading: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  grid: { justifyContent: 'space-between' },
  nav: { height: 60, flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, paddingTop: 7, paddingBottom: 7 },
  navItem: { alignItems: 'center', minWidth: 72 },
  navLabel: { fontFamily: 'Inter_700Bold', fontSize: 12, marginTop: 2 },
  profile: { padding: 16, paddingBottom: 30 },
  themeRow: { marginTop: 24, padding: 14, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  themeTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  themeHint: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
  systemMode: { alignItems: 'center', padding: 16 },
  systemText: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  empty: { textAlign: 'center', fontFamily: 'Inter_400Regular', marginTop: 80 },
});
