import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMarket} from '../context/MarketContext';
import {useNavigation} from '@react-navigation/native';

const FavoritesCard = ({favorites, isCurrentUserPage}) => {
  const navigation = useNavigation();
  if (favorites?.succeeded === false) {
    // Yükleniyor durumunu göstermek için.
    return (
      <View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EEF1FF',
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 25,
              paddingRight: 20,
              marginHorizontal: 0,
              borderRadius: 20,
              alignItems: 'center',
              marginTop: 30,
            }}>
            <View>
              <Text
                style={{
                  color: '#345c74',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  paddingLeft: 30,
                  width: 280,
                }}> {isCurrentUserPage ? 'Henüz favori bir piyasan yok':'Favori bir piyasa eklenmemiş'}</Text>
              <View style={{flexDirection: 'row'}}></View>
            </View>
          </View>
      </View>
    );
  }

  return (
    <View>
      {favorites?.data.map((item, index) => (
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
          <TouchableOpacity>
          <Ionicons name="heart-sharp" color="#f58084" size={35} />
          </TouchableOpacity>
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

export default FavoritesCard;
