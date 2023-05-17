import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useAuth } from '../context/AuthContext';

import AddMarketScreen from '../screens/AddMarketScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen.js';
import Tabs from '../navigation/tabs';
import MarketDetailScreen from '../screens/MarketDetailScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
//   const {token} =useAuth();
//   let initialRoute = "Welcome";
//   console.log("nav sayfasındayım", token)
//   if (token!==null) {
//   initialRoute = "Tabs";
// }
  
  return (
    <NavigationContainer>
      {/* buraya initialrouteName ekleyince ilk sayfayı belirleyebilirsin */}
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="AddMarketScreen"
          component={AddMarketScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="MarketDetail"
          component={MarketDetailScreen}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
