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
import { format } from 'date-fns';
import { useFavorites } from '../context/FavoritesContext';

const MarketDetailScreen = ({navigation}) => {
  const route = useRoute();
  const [market, setMarket] = useState(null);
  const [user, setUser] = useState(null);
  const {marketId} = route.params;
  const {fetchMarketById} = useMarket();
  const {fetchOtherUserByUserName,currentUserData} = useUser();
  const { getFavoritesByUserName, addMarketToFavorites, removeMarketFromFavorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const getMarket = async () => {
      const marketData = await fetchMarketById(marketId);
      const userData = await fetchOtherUserByUserName(marketData.userName);
      setUser(userData);
      const date = new Date(marketData.marketEndDate);
        setMarket({
          ...marketData,
          formattedEndDate: format(date, 'yyyy-MM-dd'),
          formattedEndTime: format(date, 'HH:mm'),
        });
       
    };
    getMarket();
    const checkFavorite = async () => {
      const favorites = await getFavoritesByUserName(currentUserData.data.userName);
      if(favorites.succeeded){
        const favoriteMarket = favorites.data.find((favorite) => favorite.marketId === marketId);
        setIsFavorite(!!favoriteMarket);
      }
    };
    checkFavorite();
}, [marketId]);
const toggleFavorite = async () => {
  if(isFavorite){
    const removed = await removeMarketFromFavorites(marketId);
    if(removed){
      setIsFavorite(false);
    }
  }else{
    const added = await addMarketToFavorites(marketId);
    if(added.succeeded){
      setIsFavorite(true);
    }
  }
};


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
          onPress={toggleFavorite}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 30,
            // backgroundColor: '#9a3c7e',
            marginLeft: 270,
          }}>
    <Ionicons name={isFavorite ? "ios-heart-sharp" : "ios-heart-outline"} color="#FFF" size={35} />
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
      {/* {`Tarih: ${market.formattedEndDate} Saat: ${market.formattedEndTime}`} */}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginBottom:30,
          alignSelf: 'center',
          textAlign: 'center',
        }}
        
        onPress={
          currentUserData.data.userName === user.data.userName
            ? () => navigation.navigate('ProfileScreen')
            : () => navigation.push('OtherUserPage', { userName: user.data.userName })
        }>
        <Image
         source={user.data.profilePhotoUrl? {uri: user.data.profilePhotoUrl} : require('../assets/images/nopic.png')}
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
            {user.data.userName}
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
      <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#DBDFEA',
            marginTop: 0,
            marginBottom:20,
            marginHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 8,
            alignItems:'center',
            justifyContent:'center'

          }}>
            <Text
              style={{
                color: '#345c74',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                
              }}>
              {`Bitiş Zamanı:   ${market.formattedEndDate} , ${market.formattedEndTime}`}  
            </Text>
          </View>
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
         <StocksCard stock={stock} market={market} num={index} navigation={navigation} />
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
