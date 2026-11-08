import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator }
  from '@react-navigation/native-stack';
import { createBottomTabNavigator }
  from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritScreen from '../screens/FavoritScreen';
import ProfilScreen from '../screens/ProfilScreen';
import CartScreen from '../screens/CartScreen';
import TentangScreen from '../screens/TentangScreen';
import { COLORS } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ICONS = { Beranda: 'home', Favorit: 'heart', Keranjang: 'cart', Profil: 'person' };

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} size={size}
            color={color} />
        ),
      })}>
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Favorit" component={FavoritScreen} />
      <Tab.Screen name="Keranjang" component={CartScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Tentang" component={TentangScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
