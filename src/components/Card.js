import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { FONTS, RADIUS, SHADOW_CARD } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import Rating from './Rating.js';

// Figma "Card" (160 lebar, radius 12): Image art, Title, Price, Show Discount, Discount
// image: URL string (uri) ATAU require('../../assets/x.png')
// discount: angka (mis. 10) -> badge "-10%" di pojok gambar (Show Discount)
export default function Card({ title, price, image, onPress, discount, rating, columns = 2 }) {
  const colors = useTheme();
  const source = typeof image === 'string' ? { uri: image } : image;
  const width = `${(100 - (columns - 1) * 2) / columns}%`;
  return (
    <Pressable style={[styles.card, { width, backgroundColor: colors.card }]} onPress={onPress}>
      <View style={[styles.imageWrap, { backgroundColor: colors.background }]}>
        <Image source={source} style={styles.image} resizeMode="contain" />
        {discount ? (
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>-{discount}%</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{title}</Text>
        {rating ? <Rating value={rating} showNumber={false} /> : null}
        <Text style={[styles.price, { color: colors.primary }]}>$ {price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%', marginBottom: 8,
    borderRadius: RADIUS.md, overflow: 'hidden',
    ...SHADOW_CARD,
  },
  imageWrap: {
    height: 154, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 18,
  },
  image: { width: '70%', height: 118 },
  badge: {
    position: 'absolute', top: 8, left: 8,
    borderRadius: RADIUS.md,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  badgeText: { fontSize: 13, fontFamily: FONTS.bold },
  body: { padding: 12, gap: 4, minHeight: 86 },
  title: { fontSize: 14, fontFamily: FONTS.regular, minHeight: 38 },
  price: { fontFamily: FONTS.bold, fontSize: 15 },
});
