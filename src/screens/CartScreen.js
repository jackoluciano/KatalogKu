import { Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

export default function CartScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <HeaderBar title="Keranjang" />
      <Text style={{ padding: 16, color: COLORS.muted, textAlign: 'center', marginTop: 64 }}>
        Keranjang masih kosong
      </Text>
    </View>
  );
}
