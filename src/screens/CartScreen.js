import { Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default function CartScreen() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Keranjang" />
      <Text style={{ padding: 16 }}>Keranjang masih kosong</Text>
    </View>
  );
}
