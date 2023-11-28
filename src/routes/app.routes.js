import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Card from '../pages/Card';
import Profile from '../pages/Profile';
import NewTransfer from '../pages/NewTransfer';


const AppTab = createBottomTabNavigator();

function AppRoutes() {
  return (
    <AppTab.Navigator screenOptions={{
      headerShown: false, // cabeçalho de cima
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#3883BB',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#214168',
        borderTopWidth: 0,
        marginBottom: 15
      },
      freezeOnBlur: true,
    }}>
      <AppTab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => {
          return (
            <Entypo name="home" size={size} color={color} />
          )
        }
      }} />
      <AppTab.Screen name="Card" component={Card} options={{
        tabBarIcon: ({ color, size }) => {
          return (
            <Entypo name="wallet" size={size} color={color} />
          )
        }
      }} />
      <AppTab.Screen name="NewTransfer" component={NewTransfer} options={{
        tabBarIcon: ({ color, size }) => {
          return (
            <AntDesign name="pluscircle" size={size} color={color} />)
        }
      }} />


      <AppTab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, size }) => {
          return (
            <MaterialIcons name="account-circle" size={size} color={color} />
          )
        }
      }} />

    </AppTab.Navigator>
  );
}

export default AppRoutes;
