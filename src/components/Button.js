import { Pressable, Text, StyleSheet } from 'react-native';
import { FONTS, RADIUS } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

// Figma "Button": Variant = primary | outline | danger, State = default | disabled
// Tinggi 48, radius 12, padding horizontal 24, label Inter Bold 15.
export default function Button({
  title, onPress, variant = 'primary', disabled = false,
}) {
  const colors = useTheme();
  const outline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: variant === 'danger' ? colors.danger : colors.primary },
        outline && { backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 1.5 },
        (pressed || disabled) && styles.dim,
      ]}>
      <Text style={[styles.text, { color: outline ? colors.primary : colors.onPrimary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48, paddingHorizontal: 24,
    borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center',
  },
  dim: { opacity: 0.5 },
  text: { fontSize: 15, fontFamily: FONTS.bold },
});