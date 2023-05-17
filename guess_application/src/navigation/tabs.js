import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddMarketScreen from '../screens/AddMarketScreen';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: Colors.borderWithOpacity,
        ...styles.shadow,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
const Tabs = ({navigation}) => {

  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 5,
          backgroundColor: '#ffffff',
          borderRadius: 0,
          height: 80,
          ...styles.shadow,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        onPress={() => navigation.navigate('Home')}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../assets/icons/home.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  marginBottom: 12,
                  tintColor: focused ? Colors.borderWithOpacity : '#748c94',
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#1f41bb' : '#748c94',
                fontSize: 12,
                marginBottom: 12,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Anasayfa
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../assets/icons/loupe.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  marginBottom: 12,
                  tintColor: focused ? Colors.borderWithOpacity : '#748c94',
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#1f41bb' : '#748c94',
                fontSize: 12,
                marginBottom: 12,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Arama
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="AddMarket"
        component={AddMarketScreen}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/plus.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: Colors.onPrimary,
                marginTop: 15,
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#e32f45': '#748c94',
                fontSize: 12,
              }}></Text>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../assets/icons/notification.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  marginBottom: 12,
                  tintColor: focused ? Colors.borderWithOpacity :'#748c94',
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#1f41bb' : '#748c94',
                fontSize: 12,
                marginBottom: 12,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Bildirimler
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../assets/icons/user.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  marginBottom: 12,
                  tintColor: focused ? Colors.borderWithOpacity : '#748c94',
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#1f41bb' : '#748c94',
                fontSize: 12,
                marginBottom: 12,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Profil
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    
    elevation: 4,
  },
});
export default Tabs;
