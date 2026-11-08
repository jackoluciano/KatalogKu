import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { validateProfil } from '../utils/validators';
import { FONTS } from '../theme/tokens';
import { useTheme, useThemeMode } from '../theme/ThemeContext';

const AWAL = {
  nama: '',
  email: '',
  hp: '',
  password: '',
  ulangiPassword: '',
};

export default function ProfilScreen({ navigation }) {
  const colors = useTheme();
  const { themeMode, setThemeMode } = useThemeMode();
  const { values, errors, handleChange, handleSubmit, reset } =
    useForm(AWAL, validateProfil);
  const isIncomplete = Object.values(values).some((value) => !value.trim());

  const simpan = (data) => {
    Alert.alert('Berhasil', `Profil ${data.nama} tersimpan!`);
    reset();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title="Profil" subtitle="Lengkapi data akunmu" />
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <CustomInput
          label="Nama Lengkap"
          value={values.nama}
          onChangeText={handleChange('nama')}
          error={errors.nama}
        />
        <CustomInput
          label="Email"
          value={values.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={handleChange('email')}
          error={errors.email}
        />
        <CustomInput
          label="No. HP"
          value={values.hp}
          keyboardType="phone-pad"
          onChangeText={handleChange('hp')}
          error={errors.hp}
        />
        <CustomInput
          label="Password"
          value={values.password}
          secureTextEntry
          onChangeText={handleChange('password')}
          error={errors.password}
        />
        <CustomInput
          label="Ulangi Password"
          value={values.ulangiPassword}
          secureTextEntry
          onChangeText={handleChange('ulangiPassword')}
          error={errors.ulangiPassword}
        />
        <Button
          title="Simpan Profil"
          disabled={isIncomplete}
          onPress={handleSubmit(simpan)}
        />
        <View style={[styles.themeRow, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <View>
            <Text style={[styles.themeTitle, { color: colors.text }]}>Mode gelap</Text>
            <Text style={[styles.themeHint, { color: colors.muted }]}>
              {themeMode === 'dark' ? 'Aktif' : 'Nonaktif'}
            </Text>
          </View>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.onPrimary}
          />
        </View>
        <View style={styles.about}>
          <Button
            title="Tentang Aplikasi"
            variant="outline"
            onPress={() => navigation.navigate('Tentang')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { padding: 16 },
  themeRow: {
    marginTop: 24, padding: 14, borderRadius: 12, borderWidth: 1,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  themeTitle: { fontFamily: FONTS.bold, fontSize: 15 },
  themeHint: { fontFamily: FONTS.regular, fontSize: 12, marginTop: 4 },
  about: { marginTop: 16 },
});
