import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import CategoryChips from '../components/CategoryChips';
import Card from '../components/Card';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { useTheme } from '../theme/ThemeContext';

export default function HomeScreen({ onProduct }) {
  const colors = useTheme();
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 4 : width >= 500 ? 3 : 2;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const categories = ['Semua', ...new Set(DUMMY_PRODUCTS.map((product) => product.category))];
  const products = useMemo(() => DUMMY_PRODUCTS.filter((product) => (
    (category === 'Semua' || product.category === category)
    && product.title.toLowerCase().includes(query.toLowerCase())
  )), [category, query]);

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
          </>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>Produk tidak ditemukan</Text>
        }
        renderItem={({ item }) => (
          <Card {...item} columns={numColumns} onPress={() => onProduct(item)} />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 24 },
  grid: { justifyContent: 'space-between' },
  empty: { textAlign: 'center', marginTop: 40 },
});
