export function validateProfil(values) {
  const errors = {};

  if (!values.nama.trim()) {
    errors.nama = 'Nama wajib diisi';
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Format email tidak valid';
  }
  if (!/^08\d{8,11}$/.test(values.hp)) {
    errors.hp = 'No. HP diawali 08, total 10-13 digit';
  }
  if (values.password.length < 8) {
    errors.password = 'Password minimal 8 karakter';
  }
  if (values.ulangiPassword !== values.password) {
    errors.ulangiPassword = 'Password tidak sama';
  }

  return errors;
}
