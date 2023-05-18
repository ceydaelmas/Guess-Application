import React, {useEffect, useState} from 'react';
import {Image, Text} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileTabView from '../components/ProfileTabView';
import {useMarket} from '../context/MarketContext';
import {useUser} from '../context/UserContext';

const OtherUserPage = ({navigation}) => {
  const route = useRoute();
  const userName = route.params.userName;
  const { fetchOtherUserByUserName, followUser, unfollowUser, getAllFollowing,currentUserData } = useUser();
  const [userData, setUserData] = useState(null);
  const [followingUsers, setFollowingUsers] = useState({});
  const [markets, setMarkets] = useState(null);
  const {getAllMarketsForOtherUser} = useMarket();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOtherUserByUserName(userName);
      setUserData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      const followingData = await getAllFollowing(currentUserData.data.userName);
      setFollowingUsers(followingData.userNameProfileImgPair);
    };
    fetchFollowingUsers();
  }, [userName]);

  const handleFollow = async () => {
    if (followingUsers.hasOwnProperty(userData.data.userName)) {
      await unfollowUser(userData.data.userName);
      const newFollowingUsers = { ...followingUsers };
      delete newFollowingUsers[userData.data.userName];
      setFollowingUsers(newFollowingUsers);
    } else {
      await followUser(userData.data.userName);
      const newFollowingUsers = { 
        ...followingUsers,
        [userData.data.userName]: userData.data.profilePhotoUrl // Veya takip edilen kullanıcının diğer bilgileri
      };
      setFollowingUsers(newFollowingUsers);
    }
    const updatedUserData = await fetchOtherUserByUserName(userData.data.userName);
    setUserData(updatedUserData);
  };
  
  useEffect(() => {
    const getMarket = async () => {
      const marketData = await getAllMarketsForOtherUser(
        userName,
      );
      setMarkets(marketData);
    };
    getMarket();
  }, [userData]);

  if (markets === null||userData === null) {
    // Yükleniyor durumunu göstermek için.
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size={'large'}
          style={{padding: 12, backgroundColor: '#DBDFEA', borderRadius: 12}}
          color="#ACB1D6"
        />
        <Text
          style={{fontSize: 18, marginTop: 12, fontFamily: 'Poppins-SemiBold'}}>
          Kullanıcı yükleniyor...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
        }}>
        {/* Geri gitme tuşu */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 30,
            // backgroundColor: '#9a3c7e',
          }}>
          <Ionicons name="ios-arrow-back-sharp" color="#ACB1D6" size={35} />
        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Image
          source={
            userData.data.profilePhotoUrl
              ? {uri: userData.data.profilePhotoUrl}
              : require('../assets/images/nopic.png')
          }
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
          {userData.data.userFullName}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: '#AEB5BC',
            fontSize: 15,
            marginBottom: 10,
          }}>
          {userData.data.userName}
        </Text>

        <TouchableOpacity onPress={handleFollow}>
          <View
            style={{
              width: '100%',
              height: 35,
              borderColor: '#DEDEDE',
              borderRadius: 5,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
                paddingHorizontal: 60,
                opacity: 0.8,
              }}>
              {followingUsers.hasOwnProperty(userData.data.userName) ? 'Takipten Çıkar' : 'Takip Et'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 32,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('FollowScreen', {
              userName: userData.data.userName,
              isFollowerPage: true,
            })
          }
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
            {userData.data.numberOfFollowers}
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
          style={{alignItems: 'center', flex: 1}}
          onPress={() =>
            navigation.push('FollowScreen', {
              userName: userData.data.userName,
              isFollowerPage: false,
            })
          }>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 24}}>
            {userData.data.numberOfFollowing}
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

      <ProfileTabView markets={markets} />
    </SafeAreaView>
  );
};

export default OtherUserPage;
