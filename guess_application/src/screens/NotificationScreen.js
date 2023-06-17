import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import ProfileTabView from '../components/ProfileTabView';
import {useNotification} from '../context/NotificationContext';
import {Image} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';


const NotificationScreen = ({navigation}) => {
  const {notificationData} = useNotification();

  const formattedNotificationData = notificationData.map(item => {
    const createdAtDate = new Date(item.createdAt);
    const formattedTime = format(createdAtDate, 'HH:mm');
    return {...item, formattedTime: formattedTime};
  });

  console.log('screen', notificationData);
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        minHeight: 500,
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingBottom: 100,
      }}>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
          color: '#345c74',
          paddingTop: 30,
        }}>
        Son Aktiviteler
      </Text>

      <View>
        {formattedNotificationData.map((item, index) => (
          <View
            key={index}
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
              source={require('../assets/images/not.png')}
              style={{width: 27, height: 27}}
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
                {item.message}
              </Text>
              <View style={{flexDirection: 'row'}}></View>
            </View>

            <Text
              style={{
                color: '#f58084',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
              }}>
              {item.formattedTime}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default NotificationScreen;
