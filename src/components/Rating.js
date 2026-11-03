import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function Rating({ value = 0, showNumber = true }) {
  const colors = useTheme();
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <View style={styles.row}>
      <Text style={[styles.stars, { color: colors.accent }]}>{'★'.repeat(full)}{'☆'.repeat(5 - full)}</Text>
      {showNumber ? <Text style={[styles.num, { color: colors.muted }]}>{Number(value).toFixed(1)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stars: { fontSize: 13 },
  num: { fontSize: 13 },
});