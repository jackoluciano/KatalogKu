import { useMemo, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Switch, Text, View, useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, TitanOne_400Regular } from '@expo-google-fonts/titan-one';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import HeaderBar from './src/components/HeaderBar';
import Button from './src/components/Button';
import Card from './src/components/Card';
import CustomInput from './src/components/CustomInput';
import Chip from './src/components/Chip';
import Rating from './src/components/Rating.js';
import { DARK_COLORS, LIGHT_COLORS } from './src/theme/colors';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

const PRODUCTS = [
  { title: 'Kemeja Batik Parang', price: 25, category: 'fashion', image: require('./assets/tee.png'), description: 'Kemeja batik motif parang, bahan katun adem.', rating: 4.6 },
  { title: 'Kopi Gayo 250 gr', price: 9, category: 'groceries', image: require('./assets/shelf.png'), description: 'Kopi Gayo pilihan dengan aroma khas.', rating: 4.8 },
  { title: 'Earphone Bluetooth', price: 19, category: 'electronics', image: require('./assets/beanie.png'), discount: 10, description: 'Audio jernih dengan koneksi Bluetooth.', rating: 4.4 },
  { title: 'Tas Ransel Laptop', price: 32, category: 'fashion', image: require('./assets/cap.png'), description: 'Tas laptop praktis untuk aktivitas harian.', rating: 4.5 },
];

export default function App() {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');
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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const visibleProducts = useMemo(() => PRODUCTS.filter((product) => (
    (category === 'Semua' || product.category === category)
    && product.title.toLowerCase().includes(search.toLowerCase())
  )), [category, search]);

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
          <HomePage products={visibleProducts} search={search} setSearch={setSearch}
            category={category} setCategory={setCategory} onProduct={openProduct} />
        )}
        {page === 'favorites' && (
          <FavoritesPage favorites={favorites} onProduct={openProduct} />
        )}
        {page === 'profile' && (
          <ProfilePage themeMode={themeMode} setThemeMode={setThemeMode} />
        )}
        {page === 'detail' && selected && (
          <DetailPage product={selected} isFavorite={favorites.some((item) => item.title === selected.title)}
            onFavorite={() => toggleFavorite(selected)} onBack={() => setPage('home')} />
        )}
        {page !== 'detail' && (
          <BottomNav page={page} setPage={setPage} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

function HomePage({ products, search, setSearch, category, setCategory, onProduct }) {
  return (
    <>
      <HeaderBar title="KATALOGKU" subtitle="Temukan produk favorit" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <CustomInput icon="search" placeholder="Cari produk..." value={search} onChangeText={setSearch} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {['Semua', 'fashion', 'groceries', 'electronics'].map((item) => (
            <Chip key={item} label={item} active={category === item} onPress={() => setCategory(item)} />
          ))}
        </ScrollView>
        <View style={styles.grid}>
          {products.map((product) => <Card key={product.title} {...product} onPress={() => onProduct(product)} />)}
        </View>
      </ScrollView>
    </>
  );
}

function FavoritesPage({ favorites, onProduct }) {
  return (
    <>
      <HeaderBar title="FAVORIT" subtitle="Produk tersimpan" />
      <ScrollView contentContainerStyle={styles.content}>
        {favorites.length ? <View style={styles.grid}>
          {favorites.map((product) => <Card key={product.title} {...product} onPress={() => onProduct(product)} />)}
        </View> : <EmptyState text="Belum ada produk favorit" />}
      </ScrollView>
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

function DetailPage({ product, isFavorite, onFavorite, onBack }) {
  const colors = useTheme();
  return (
    <>
      <HeaderBar title="DETAIL PRODUK" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.detail}>
        <View style={[styles.detailImage, { backgroundColor: colors.card }]}>
          <CardImage product={product} />
        </View>
        <Text style={[styles.category, { color: colors.muted }]}>{product.category.toUpperCase()}</Text>
        <Text style={[styles.detailTitle, { color: colors.text }]}>{product.title}</Text>
        <Text style={[styles.detailPrice, { color: colors.primary }]}>$ {product.price}</Text>
        <Rating value={product.rating} />
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        <Button title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'} onPress={onFavorite} />
      </ScrollView>
    </>
  );
}

function CardImage({ product }) {
  return <Image source={product.image} style={styles.detailAsset} resizeMode="contain" />;
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
  chips: { gap: 8, paddingBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  nav: { height: 60, flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, paddingTop: 7, paddingBottom: 7 },
  navItem: { alignItems: 'center', minWidth: 72 },
  navLabel: { fontFamily: 'Inter_700Bold', fontSize: 12, marginTop: 2 },
  profile: { padding: 16, paddingBottom: 30 },
  themeRow: { marginTop: 24, padding: 14, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  themeTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  themeHint: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
  systemMode: { alignItems: 'center', padding: 16 },
  systemText: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  detail: { padding: 16 },
  detailImage: { height: 315, borderRadius: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  detailAsset: { width: '90%', height: 290 },
  category: { fontFamily: 'Inter_700Bold', fontSize: 13, marginTop: 16 },
  detailTitle: { fontFamily: 'TomoTrompaPro', fontSize: 22, marginTop: 4 },
  detailPrice: { fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 10 },
  description: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 22, marginVertical: 20 },
  empty: { textAlign: 'center', fontFamily: 'Inter_400Regular', marginTop: 80 },
});
