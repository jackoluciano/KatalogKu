import { Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';

export default function ProfilScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Profil" />
      <Text style={{ padding: 16 }}>Segera hadir di Modul 6</Text>
      <View style={{ padding: 16 }}>
        <Button
          title="Tentang Aplikasi"
          onPress={() => navigation.navigate('Tentang')}
        />
      </View>
    </View>
  );
}
