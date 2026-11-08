import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext(null);
const STORAGE_KEY = '@katalogku/cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setCart(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Gagal memuat keranjang:', error);
      } finally {
        setLoaded(true);
      }
    }

    loadCart();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
      .catch((error) => console.error('Gagal menyimpan keranjang:', error));
  }, [cart, loaded]);

  const isInCart = (id) => cart.some((product) => product.id === id);

  const toggleCart = (product) => {
    setCart((previous) => (
      previous.some((item) => item.id === product.id)
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product]
    ));
  };

  return (
    <CartContext.Provider value={{ cart, isInCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
