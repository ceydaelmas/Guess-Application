import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native-elements';
import ProfileTabView from '../components/ProfileTabView';
import {useUser} from '../context/UserContext';
import {useAuth} from '../context/AuthContext';
import {useMarket} from '../context/MarketContext';
import { useFavorites } from '../context/FavoritesContext';

const ProfileScreen = ({navigation}) => {
  const {currentUserData} = useUser();
  const {currentUserMarkets} = useMarket();
  const { getFavoritesByUserName} = useFavorites();
  const [favorites,setFavorites] = useState(null);
//   useEffect(() => {
//     const getMarket = async () => {
//       const favoritesMarketData = await getFavoritesByUserName(currentUserData.data.userName);
//       setFavorites(favoritesMarketData);    
//     };
//     getMarket();
    
// }, []);
// console.log("useeffeck",favorites);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <TouchableOpacity
        onPress={() => navigation.push('SettingsScreen')}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 24,
          marginHorizontal: 16,
        }}>
        <Ionicons
          name="ios-settings-outline"
          size={30}
          color="#52575D"></Ionicons>
      </TouchableOpacity>

      <View style={{alignSelf: 'center'}}>
        <Image
          source={currentUserData.data.profilePhotoUrl? {uri: currentUserData.data.profilePhotoUrl} : require('../assets/images/nopic.png')}
          style={{
            height: 130,
            width: 130,
            borderRadius: 130 / 2,
            borderWidth: 5,
            borderColor: '#ACB1D6',
            overflow: 'hidden',
          }}
        />
      </View>

      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: '#52575D',
            fontSize: 25,
          }}>
          {currentUserData.data.userFullName}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: '#AEB5BC',
            fontSize: 15,
          }}>
          {currentUserData.data.userName}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 32,
        }}>
        <TouchableOpacity
          onPress={() => navigation.push('FollowScreen', { userName: currentUserData.data.userName,isFollowerPage:true })}
          style={{
            alignItems: 'center',
            flex: 1,
            borderColor: '#AEB5BC',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            marginBottom: 25,
            height: 50,
          }}>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 24}}>
            {currentUserData.data.numberOfFollowers}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: '#AEB5BC',
              textTransform: 'uppercase',
            }}>
            Takipçi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push('FollowScreen', { userName: currentUserData.data.userName, isFollowerPage:false })}
          style={{alignItems: 'center', flex: 1}}>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 24}}>
            {currentUserData.data.numberOfFollowing}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: '#AEB5BC',
              textTransform: 'uppercase',
            }}>
            Takip
          </Text>
        </TouchableOpacity>
      </View>
      <ProfileTabView markets={currentUserMarkets}  />
    </SafeAreaView>
  );
};
export default ProfileScreen;
