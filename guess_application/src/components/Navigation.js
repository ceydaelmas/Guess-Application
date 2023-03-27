import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {AuthContext} from '../context/AuthContext';
import AddMarketScreen from '../screens/AddMarketScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen.js';
import Tabs from '../navigation/tabs';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* buraya initialrouteName ekleyince ilk sayfayı belirleyebilirsin */}
      <Stack.Navigator initialRouteName='Welcome'>
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
               <Stack.Screen name="Home" component={HomeScreen} />
               <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
               <Stack.Screen
              name="AddMarket"
              component={AddMarketScreen}
              options={{headerShown: false}}
            />
              <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
                <Stack.Screen
              name="Notification"
              component={NotificationScreen}
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