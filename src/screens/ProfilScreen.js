import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import { useTheme } from '../theme/ThemeContext';

export default function ProfilScreen({ navigation }) {
  const colors = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title="Profil" />
      <ScrollView contentContainerStyle={styles.content}>
        <CustomInput label="Nama Lengkap" defaultValue="Budi Santoso" />
        <CustomInput label="Email" defaultValue="budi@" error="Format email tidak valid" />
        <CustomInput label="No. HP" defaultValue="0812" error="No. HP diawali 08, total 10–13 digit" />
        <CustomInput label="Password" defaultValue="••••••" secureTextEntry error="Password minimal 8 karakter" />
        <Button title="Simpan Profil" onPress={() => {}} />
        <View style={styles.about}>
        <Button
          title="Tentang Aplikasi"
          onPress={() => navigation.navigate('Tentang')}
        />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 30 },
  about: { marginTop: 16 },
});
