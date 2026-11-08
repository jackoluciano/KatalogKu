import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import Rating from '../components/Rating';
import { FONTS, SHADOW_CARD } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import { useFavorit } from '../context/FavoritContext';
import { useCart } from '../context/CartContext';

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;
  const colors = useTheme();
  const { isFavorit, toggleFavorit } = useFavorit();
  const { isInCart, toggleCart } = useCart();
  const fav = isFavorit(product.id);
  const inCart = isInCart(product.id);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title={product.title} onBack={() => navigation.goBack()} />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.imageBox, { backgroundColor: colors.card }]}>
          <Image source={product.thumbnail} style={styles.image} resizeMode="contain" />
        </View>
        <Text style={[styles.category, { color: colors.muted }]}>{product.category.toUpperCase()}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>$ {product.price}</Text>
        <Rating value={product.rating} />
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        <Button
          title={fav ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
          variant={fav ? 'outline' : 'primary'}
          onPress={() => toggleFavorit(product)}
        />
        <View style={styles.cartButton}>
          <Button
            title={inCart ? 'Hapus dari Keranjang' : 'Tambah ke Keranjang'}
            variant={inCart ? 'outline' : 'primary'}
            onPress={() => toggleCart(product)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  imageBox: {
    height: 300, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 28, overflow: 'hidden', ...SHADOW_CARD,
  },
  image: { width: '78%', height: 230 },
  category: { fontSize: 13, marginTop: 16, fontWeight: '700' },
  title: { fontFamily: FONTS.heading, fontSize: 20, marginTop: 4 },
  price: { fontSize: 20, marginTop: 6, fontWeight: '700' },
  description: { fontSize: 15, lineHeight: 22, marginVertical: 16 },
  cartButton: { marginTop: 12 },
});
