import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMarket } from '../context/MarketContext';
import { useNavigation } from '@react-navigation/native';

const MarketCards = () => {
  const {currentUserMarkets} = useMarket();
  const navigation = useNavigation();
  return (
    <View>
      {currentUserMarkets.map(item => ( 
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#DBDFEA',
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 20,
            paddingRight: 20,
            marginHorizontal: 0,
            borderRadius: 20,
            alignItems: 'center',
            marginTop: 10,
          }}
          >
          <Image
          source={require('../assets/images/check.png')}
          style={{width: 30, height: 30}}
        />
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
          <View style={{flexDirection:'row'}}>
          <Text
            style={{
              color: '#f58084',
              fontFamily: 'Poppins-Regular',
              fontSize: 15,
              paddingHorizontal: 20,
              flex: 2, flexWrap: 'wrap'
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
             {item.marketOperationNumber} işlem yapıldı{' '}
          </Text>
        </View>
        <View style={{
            paddingLeft:30,
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
           onPress={() => navigation.push('MarketDetail', { marketId: item.marketId })}
        >
          <Ionicons name="ios-arrow-forward-sharp" color="#f58084" size={30} />
        </TouchableOpacity></View>
        </View>
       ))} 
    </View>
  )
}

export default MarketCards