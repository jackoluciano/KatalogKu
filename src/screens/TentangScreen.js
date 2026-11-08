import { Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';

const NAMA = 'Jacko Luciano';
const NIM = '18224101';

export default function TentangScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Tentang" onBack={() => navigation.goBack()} />
      <View style={{ padding: 16 }}>
        <Text>KatalogKu</Text>
        <Text>Versi 1.0.0</Text>
        <Text>{NAMA}</Text>
        <Text>{NIM}</Text>
      </View>
    </View>
  );
}
