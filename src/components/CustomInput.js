import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, RADIUS } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

// Figma "CustomInput": State = default | error, Label, Value, Error, Show Label, Show Icon
// Tinggi kolom 48, radius 12, border 1, padding horizontal 12, gap 8, ikon 24.
// icon: nama Ionicons (mis. "search"); ...rest diteruskan ke TextInput.
export default function CustomInput({ label, error, icon, ...rest }) {
  const colors = useTheme();
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}
      <View style={[styles.box, { borderColor: colors.border, backgroundColor: colors.card }, error && { borderColor: colors.danger }]}>
        {icon ? <Ionicons name={icon} size={24} color={colors.muted} /> : null}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.muted}
          {...rest}
        />
      </View>
      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14, gap: 8 },
  label: { fontFamily: FONTS.bold, fontSize: 15 },
  box: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    minHeight: 48, borderWidth: 1,
    borderRadius: RADIUS.md, paddingHorizontal: 12,
  },
  input: { flex: 1, fontFamily: FONTS.regular, fontSize: 15 },
  error: { fontFamily: FONTS.bold, fontSize: 13 },
});