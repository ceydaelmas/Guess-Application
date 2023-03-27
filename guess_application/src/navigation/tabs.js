import React from 'react';
import { StyleSheet, Text,View,Image,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddMarketScreen from '../screens/AddMarketScreen';

const Tab = createBottomTabNavigator();
const Tabs =() => {
    return(
        <Tab.Navigator tabBarOptions={{
          showLabel:false,
          style:{
            position:'absolute',
            bottom: 25,
            left:20,
            right:20,
            elevation:0,
            backgroundColor:'#ffffff',
            borderRadius:15,
            height:90,
            ...styles.shadow
          }
        }}>
          <Tab.Screen name="Home" component={HomeScreen} 
          options={{
            tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center', top:10}}>
              <Image 
              source={require('../assets/icons/home.png')}
              resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor:focused ? '#e32f45' : '#748c94'
              }}
              />
              <Text style={{color:focused ? '#e32f45' : '#748c94', fontSize:12}}>Home</Text>
            </View>
          )}}/>
          <Tab.Screen name="Search" component={SearchScreen}          options={{
            tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center', top:10}}>
              <Image 
              source={require('../assets/icons/loupe.png')}
              resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor:focused ? '#e32f45' : '#748c94'
              }}
              />
              <Text style={{color:focused ? '#e32f45' : '#748c94', fontSize:12}}>Search</Text>
            </View>
          )}}/>
          <Tab.Screen name='AddMarket' component={AddMarketScreen}          options={{
            tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center', top:10}}>
              <Image 
              source={require('../assets/icons/plus.png')}
              resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor:focused ? '#e32f45' : '#748c94'
              }}
              />
              <Text style={{color:focused ? '#e32f45' : '#748c94', fontSize:12}}>Profile</Text>
            </View>
          )}}/>
          <Tab.Screen name='Notification' component={NotificationScreen}          options={{
            tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center', top:10}}>
              <Image 
              source={require('../assets/icons/notification.png')}
              resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor:focused ? '#e32f45' : '#748c94'
              }}
              />
              <Text style={{color:focused ? '#e32f45' : '#748c94', fontSize:12}}>Notifications</Text>
            </View>
          )}}/>
          <Tab.Screen name='Profile' component={ProfileScreen}          options={{
            tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center', top:10}}>
              <Image 
              source={require('../assets/icons/user.png')}
              resizeMode='contain'
              style={{
                width:25,
                height:25,
                tintColor:focused ? '#e32f45' : '#748c94'
              }}
              />
              <Text style={{color:focused ? '#e32f45' : '#748c94', fontSize:12}}>Profile</Text>
            </View>
          )}}/>

        </Tab.Navigator>
    );
}
const styles=StyleSheet.create(
  {
    shadow:{
      shadowColor:'#7F5DF0',
      shadowOffset:{
        width:0,
        height:10,
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5

    }
  }
)

export default Tabs;