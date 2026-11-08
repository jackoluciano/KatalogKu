import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import Rating from '../components/Rating';
import { FONTS, SHADOW_CARD } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;
  const colors = useTheme();
  return (
    <>
      <HeaderBar title={product.title} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.imageBox, { backgroundColor: colors.card }]}>
          <Image source={product.thumbnail} style={styles.image} resizeMode="contain" />
        </View>
        <Text style={[styles.category, { color: colors.muted }]}>{product.category.toUpperCase()}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>$ {product.price}</Text>
        <Rating value={product.rating} />
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        <Button
          title="Tambah ke Favorit"
          onPress={() => {}}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
});
