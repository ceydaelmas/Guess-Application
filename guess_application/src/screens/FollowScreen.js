import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import ProfileTabView from '../components/ProfileTabView';
import {Image} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import {useRoute} from '@react-navigation/native';
import { useUser } from '../context/UserContext';


const FollowScreen = ({navigation}) => {
  const route = useRoute();
  const {userName,isFollowerPage} = route.params;
  const [userFollowData,setUserFollowData] = useState([]);
  const {getAllFollowers,getAllFollowing} = useUser();

  
  useEffect(() => {
    const getFollow = async () => {
      let followerData;
      console.log("is follower page:",isFollowerPage);
      if(isFollowerPage){
        followerData = await getAllFollowers(userName);
      } 
      else{
        followerData = await getAllFollowing(userName);
      }
      setUserFollowData(followerData);
    };
    getFollow();
  }, [userName, isFollowerPage]);

  console.log("helloğg",userFollowData);
  return (

    <View
      style={{
        backgroundColor: '#FFF',
        minHeight: 500,
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingBottom: 100,
        
      }}>
           <View
      style={{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 0,
        
      }}>
      {/* Geri gitme tuşu */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingHorizontal: 1,
          paddingVertical: 12,
          borderRadius: 10,
          marginTop: 30,
          
        }}>
        <Ionicons name="ios-arrow-back-sharp" color="#ACB1D6" size={35} />
      </TouchableOpacity>
      <View style={{justifyContent:'center'}}>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
          color: '#345c74',
          marginTop: 35,
          paddingLeft:20,
        }}>
       {isFollowerPage ? 'Takip Edenler' : 'Takip Ettiklerim'}
      </Text></View>
      </View>
       <View>
       {userFollowData && Object.entries(userFollowData?.userNameProfileImgPair || {}).map(([username, img]) =>(
          <View
            style={{
              flexDirection: 'row',
              backgroundColor:'#EEF1FF',
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
              marginHorizontal: 0,
              borderRadius: 20,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              source={img ? {uri: img} : require('../assets/images/nopic.png')}
              style={{height: 40,
                width: 40,
                borderRadius: 30 / 2,
                overflow: 'hidden',}}
            />
            <View>
              <Text
                style={{
                  color: '#345c74',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                  paddingLeft: 20,
                  width: 260,
                }}>
                {username}
              </Text>
              <View style={{flexDirection: 'row'}}></View>
            </View>
          </View>
        ))}
      </View>  
    </View>
  );
};
export default FollowScreen;
