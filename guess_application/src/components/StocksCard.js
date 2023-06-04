import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Colors from '../constants/Colors';
import OperationScreen from '../screens/OperationScreen';

const StocksCard = ({stock,market, num}) => {

  const [showPopup, setShowPopup] = useState(false);

  const onShowPopup = () => {
    setShowPopup(true);  // Set the popup to visible
  };

  const onClosePopup = () => {
    setShowPopup(false);  // Set the popup to invisible
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          backgroundColor: '#fde6ed',
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 6,
        }}>
        <Text
          style={{
            fontSize: 20,
          }}>
          {num + 1}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: '#345c74',
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            paddingLeft: 20,
            width: 160,
          }}>
          {stock.stockName}
        </Text>
      </View>
      <ProgressCircle
        percent={parseFloat(stock.stockRatio*100).toFixed(0)}
        radius={20}
        borderWidth={3}
        color="#f58084"
        shadowColor="#FFF"
        bgColor="#fff2f2">
        <Text
          style={{
            color: '#345c74',
            fontFamily: 'Poppins-Regular',
            fontSize: 15,
          }}>
          {parseFloat(stock.stockRatio*100).toFixed(0)}
        </Text>
      </ProgressCircle>
      <TouchableOpacity
        onPress={onShowPopup} 
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff2f2',
          marginHorizontal: 17,
          paddingVertical: 14,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: '#f58084',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            paddingHorizontal: 10,
          }}>
          İşlem yap
        </Text>
      </TouchableOpacity>
      <OperationScreen stock={stock} market={market} show={showPopup}  // Pass the state variable to the OperationScreen component
        onHide={onClosePopup}/>
    </View>
  );
};

export default StocksCard;
