import { Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { useTheme } from '../theme/ThemeContext';

const NAMA = 'Jacko Luciano';
const NIM = '18224101';

export default function TentangScreen({ navigation }) {
  const colors = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderBar title="Tentang" onBack={() => navigation.goBack()} />
      <View style={{ padding: 16 }}>
        <Text style={{ color: colors.text }}>KatalogKu</Text>
        <Text style={{ color: colors.muted }}>Versi 1.0.0</Text>
        <Text style={{ color: colors.text }}>{NAMA}</Text>
        <Text style={{ color: colors.text }}>{NIM}</Text>
      </View>
    </View>
  );
}
