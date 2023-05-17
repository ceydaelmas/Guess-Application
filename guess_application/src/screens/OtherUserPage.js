import React from 'react'
import { Image, Text } from 'react-native-elements'
import {useRoute} from '@react-navigation/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileTabView from '../components/ProfileTabView';

const OtherUserPage = ({navigation}) => {
  const route = useRoute();
  const {userData} = route.params;

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
          source={{uri:userData.data.profilePhotoUrl}}
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
              marginBottom:10,
            }}>
            {userData.data.userName}
          </Text>

          <TouchableOpacity>
            <View style={{
               width:'100%',
               height:35,
               borderColor:"#DEDEDE",
               borderRadius:5,
               borderWidth:2,
               justifyContent:'center',
               alignItems:'center'
            }}>
                <Text style={{
                    fontFamily:'Poppins-SemiBold',
                    fontSize:15,
                    paddingHorizontal:60,
                    opacity:0.8
                }}
                >Takip Et</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 32,
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              borderColor: '#AEB5BC',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              marginBottom:28,
              height:50
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
          </View>
          <View style={{alignItems: 'center', flex: 1}}>
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
          </View>
          
        </View><ProfileTabView/>
        </SafeAreaView>
  )
}

export default OtherUserPage