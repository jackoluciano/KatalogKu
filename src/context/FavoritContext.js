import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritContext = createContext(null);
const STORAGE_KEY = '@katalogku/favorit';

export function FavoritProvider({ children }) {
  const [favorit, setFavorit] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFavorit() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setFavorit(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Gagal memuat favorit:', error);
      } finally {
        setLoaded(true);
      }
    }

    loadFavorit();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorit))
      .catch((error) => console.error('Gagal menyimpan favorit:', error));
  }, [favorit, loaded]);

  const isFavorit = (id) => favorit.some((product) => product.id === id);

  const toggleFavorit = (product) => {
    setFavorit((previous) => (
      previous.some((item) => item.id === product.id)
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product]
    ));
  };

  return (
    <FavoritContext.Provider value={{ favorit, isFavorit, toggleFavorit }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit() {
  return useContext(FavoritContext);
}
