import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SourcesCard = ({source, num}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
        alignItems: 'center',
      }}>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}>
        <Ionicons name="ios-link-outline" color="#FFF" size={30} />
      </View>
      <View>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            paddingLeft: 10,
            width: '80%',
          }}>
          {source}
        </Text>
      </View>
    </View>
  );
};

export default SourcesCard;
