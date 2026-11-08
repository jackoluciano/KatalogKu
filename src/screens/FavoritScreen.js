import { Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

export default function FavoritScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <HeaderBar title="Favorit" />
      <Text style={{ padding: 16, color: COLORS.muted, textAlign: 'center', marginTop: 64 }}>
        Belum ada produk favorit
      </Text>
    </View>
  );
}
