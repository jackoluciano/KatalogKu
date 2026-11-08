import { ScrollView, StyleSheet } from 'react-native';
import Chip from './Chip';

export default function CategoryChips({ items, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          active={item === selected}
          onPress={() => onSelect(item)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingBottom: 10, gap: 8 },
});
