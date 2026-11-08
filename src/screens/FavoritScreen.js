import { FlatList, StyleSheet, Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Card from '../components/Card';
import { useFavorit } from '../context/FavoritContext';
import { FONTS } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

export default function FavoritScreen({ navigation }) {
  const { favorit } = useFavorit();
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title="Favorit" subtitle={`${favorit.length} produk`} />
      <FlatList
        data={favorit}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        columnWrapperStyle={favorit.length ? styles.row : undefined}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            Belum ada produk favorit
          </Text>
        }
        renderItem={({ item }) => (
          <Card
            {...item}
            columns={2}
            onPress={() => navigation.navigate('Detail', { product: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  row: { justifyContent: 'space-between' },
  empty: { textAlign: 'center', fontFamily: FONTS.regular, marginTop: 40 },
});
