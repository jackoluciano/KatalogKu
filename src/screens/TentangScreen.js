import { Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

const NAMA = 'Jacko Luciano';
const NIM = '18224101';

export default function TentangScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <HeaderBar title="Tentang" onBack={() => navigation.goBack()} />
      <View style={{ padding: 16 }}>
        <Text style={{ color: COLORS.text }}>KatalogKu</Text>
        <Text style={{ color: COLORS.muted }}>Versi 1.0.0</Text>
        <Text style={{ color: COLORS.text }}>{NAMA}</Text>
        <Text style={{ color: COLORS.text }}>{NIM}</Text>
      </View>
    </View>
  );
}
