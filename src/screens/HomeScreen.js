import { useMemo, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import CategoryChips from '../components/CategoryChips';
import Card from '../components/Card';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { useTheme } from '../theme/ThemeContext';

export default function HomeScreen({ navigation }) {
  const colors = useTheme();
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 4 : width >= 500 ? 3 : 2;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [sort, setSort] = useState('Relevan');
  const categories = ['Semua', ...new Set(DUMMY_PRODUCTS.map((product) => product.category))];
  const products = useMemo(() => {
    const filtered = DUMMY_PRODUCTS.filter((product) => (
    (category === 'Semua' || product.category === category)
    && product.title.toLowerCase().includes(query.toLowerCase())
    ));

    return sort === 'Termurah'
      ? [...filtered].sort((a, b) => a.price - b.price)
      : sort === 'Termahal'
        ? [...filtered].sort((a, b) => b.price - a.price)
        : filtered;
  }, [category, query, sort]);

  return (
    <>
      <HeaderBar title="KATALOGKU" subtitle="Temukan produk favoritmu" />
      <FlatList
        key={numColumns}
        data={products}
        numColumns={numColumns}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <CustomInput
              icon="search"
              placeholder="Cari produk..."
              value={query}
              onChangeText={setQuery}
            />
            <CategoryChips items={categories} selected={category} onSelect={setCategory} />
            <CategoryChips
              items={['Relevan', 'Termurah', 'Termahal']}
              selected={sort}
              onSelect={setSort}
            />
            <ImageBackground
              source={require('../../assets/shelf.png')}
              style={[styles.banner, { backgroundColor: colors.primary }]}
              imageStyle={styles.bannerImage}
            >
              <Text style={[styles.bannerText, { color: colors.onPrimary }]}>Diskon 50%</Text>
            </ImageBackground>
          </>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>Produk tidak ditemukan</Text>
        }
        renderItem={({ item }) => (
          <Card
            {...item}
            columns={numColumns}
            onPress={() => navigation.navigate('Detail', { product: item })}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 24 },
  grid: { justifyContent: 'space-between' },
  empty: { textAlign: 'center', marginTop: 40 },
  banner: {
    height: 92, marginBottom: 12, borderRadius: 12, overflow: 'hidden',
    justifyContent: 'center', paddingHorizontal: 20,
  },
  bannerImage: { resizeMode: 'cover', opacity: 0.35 },
  bannerText: { position: 'absolute', left: 20, fontSize: 24, fontWeight: '700' },
});
