import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMarket} from '../context/MarketContext';
import {useNavigation} from '@react-navigation/native';

const MarketCards = ({markets}) => {
  const navigation = useNavigation();
  return (
    <View>
      {markets.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            backgroundColor: '#F6F1F1',
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 20,
            paddingRight: 20,
            marginHorizontal: 0,
            borderRadius: 20,
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Ionicons name="reader-outline" color="#f58084" size={35} />
          <View>
            <Text
              style={{
                color: '#345c74',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
                paddingHorizontal: 20,
                width: 200,
              }}>
              {item.marketName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#f58084',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                  paddingHorizontal: 20,
                  flex: 2,
                  flexWrap: 'wrap',
                }}>
                {item.marketDescription}
              </Text>
            </View>

            <Text
              style={{
                color: '#345c74',
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                paddingHorizontal: 20,
              }}>
              Kategori: {item.categoryName}
            </Text>
            <Text
              style={{
                color: '#AEB5BC',
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                paddingHorizontal: 20,
              }}>
              {item.isConfirmed === false
                ? 'Onay bekliyor'
                : `${item.marketTransactionAmount} işlem yapıldı`}
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 30,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffff',
                width: 40,
                height: 40,
                borderRadius: 40,
              }}
              onPress={() =>
                navigation.push('MarketDetail', {marketId: item.marketId})
              }>
              <Ionicons
                name="ios-arrow-forward-sharp"
                color="#f58084"
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MarketCards;
