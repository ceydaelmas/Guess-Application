import React from 'react';
import {Text} from 'react-native-elements';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import StocksCard from '../components/StocksCard';
import {useRoute} from '@react-navigation/native';
import {useMarket} from '../context/MarketContext';
import {useState, useEffect} from 'react';
import { useUser } from '../context/UserContext';
import SourcesCard from '../components/SourcesCard';

const MarketDetailScreen = ({navigation}) => {
  const route = useRoute();
  const [market, setMarket] = useState(null);
  const [user, setUser] = useState(null);
  const {marketId} = route.params;
  const {fetchMarketById} = useMarket();
  const {fetchOtherUserByUserName} = useUser();

  useEffect(() => {
    const getMarket = async () => {
      const marketData = await fetchMarketById(marketId);
      const userData = await fetchOtherUserByUserName(marketData.userName);
      setUser(userData);
      setMarket(marketData);
    };
    getMarket();
  }, [marketId]);


  if (market === null || user === null) {
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
          Piyasa yükleniyor...
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
    
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ACB1D6',
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
          <Ionicons name="ios-arrow-back-sharp" color="#FFF" size={35} />
        </TouchableOpacity>
        {/* Favoriye ekleme butonu */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 30,
            // backgroundColor: '#9a3c7e',
            marginLeft: 270,
          }}>
          <Ionicons name="ios-heart-outline" color="#FFF" size={35} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#FFF',
          fontFamily: 'Poppins-Bold',
          fontSize: 35,
          width: 280,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {market.marketName}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginBottom:40,
          alignSelf: 'center',
          textAlign: 'center',
        }}
        onPress={() => navigation.push('OtherUserPage', { userData: user })}>
        <Image
          source={{uri:user.data.profilePhotoUrl }}
          style={{
            height: 60,
            width: 60,
            borderWidth: 2,
            borderColor: '#345c74',
            borderRadius: 50,
          }}
        />
        <View style={{marginHorizontal: 20}}>
          <Text
            style={{
              color: '#345c74',
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
            }}>
            {user.data.userFullName}
          </Text>
          <Text
            style={{
              color: '#345c74',
              fontFamily: 'Poppins-Regular',
              fontSize: 15,
            }}>
            Kullanıcı adı: {user.data.userName}
          </Text>
        </View>
      </TouchableOpacity>

      <Text
        style={{
          color: '#FFF',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
          marginHorizontal:20,
          marginTop:13,
          width: '100%',
        }}>
        {market.marketDescription}
      </Text>
      {market.marketStockList.map((stock, index) => (
      <View>
         <StocksCard stock={stock} num={index} />
      </View>
        ))}
       <Text
        style={{
          color: '#FFF',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
          marginHorizontal:20,
          marginTop:25,
          width: '100%',
        }}>
        Kaynaklar :
      </Text>
      {market.marketSourceLink.map((source, index) => (
      <View>
         <SourcesCard source={source} num={index} />
      </View>
        ))}
   
    </ScrollView>
  );
};

export default MarketDetailScreen;
