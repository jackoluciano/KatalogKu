import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FONTS } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

// Figma "HeaderBar": Title, Subtitle, Show Subtitle, Show Back
// Padding 36/16/16/16 di Figma (36 = status bar + 12) -> insets.top + 12; gap 12.
export default function HeaderBar({ title, subtitle, onBack }) {
  const insets = useSafeAreaInsets(); // jarak aman dari notch
  const colors = useTheme();
  return (
    <View style={[styles.bar, { paddingTop: insets.top + 12, backgroundColor: colors.primary }]}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color={colors.onPrimary} />
        </Pressable>
      ) : null}
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={[styles.title, { color: colors.onPrimary }]}>{title}</Text>
        {subtitle ? <Text style={[styles.sub, { color: colors.onPrimary }]}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingBottom: 16,
  },
  title: { fontSize: 20, fontFamily: FONTS.heading },
  titleContainer: { flex: 1 },
  sub: { fontSize: 13, fontFamily: FONTS.bold },
});