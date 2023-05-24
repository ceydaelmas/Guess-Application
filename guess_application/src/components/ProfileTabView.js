import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import MarketCards from './MarketCards';
import { useMarket } from '../context/MarketContext';
import FavoritesCard from './FavoritesCard';

const ProfileTabView = ({markets, favorites,isCurrentUserPage}) => {
  const Tab = createMaterialTopTabNavigator();
  const Markets = () => {
    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#ACB1D6',
      }}>
        <View
          style={{
            backgroundColor: '#FFF',
            minHeight:500,
            flexGrow:1,
            paddingHorizontal: 25,
            paddingBottom:100
          }}>
          <MarketCards markets={markets}/>
        </View>
      </ScrollView>
    );
  };
  const Video = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            minHeight:300,
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
         
        </View>
      </ScrollView>
    );
  };
  const Favorites = () => {
    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#ACB1D6',
      }}>
        <View
          style={{
            backgroundColor: '#FFF',
            minHeight:500,
            flexGrow:1,
            paddingHorizontal: 25,
            paddingBottom:100
          }}>
          <FavoritesCard favorites={favorites} isCurrentUserPage = {isCurrentUserPage}/>
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIndicatorStyle: {
          backgroundColor: '#ACB1D6',
          height: 2,
        }
      })}>
      <Tab.Screen name="Markets" component={Markets} options={{tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#ACB1D6' : '#748c94',
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Piyasalarım
            </Text>
          ),}} />
      <Tab.Screen name="Video" component={Video}options={{tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#ACB1D6' : '#748c94',
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Senetlerim
            </Text>
          ),}} />
      <Tab.Screen name="Favorites" component={Favorites} options={{tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#ACB1D6' : '#748c94',
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Favorilerim
            </Text>
          ),}} />
    </Tab.Navigator>
  );
};

export default ProfileTabView;