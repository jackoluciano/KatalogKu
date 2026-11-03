import { Pressable, Text, StyleSheet } from 'react-native';
import { FONTS, RADIUS } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

// Komponen tambahan dari Figma "Chip": State = default | active
// Tinggi 40, radius pill 20, padding horizontal 16, border 1.
export default function Chip({ label, active = false, onPress }) {
  const colors = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.chip, { borderColor: colors.border, backgroundColor: colors.card }, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
      <Text style={[styles.text, { color: active ? colors.onPrimary : colors.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 40, paddingHorizontal: 16, borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  text: { fontFamily: FONTS.regular, fontSize: 15 },
});