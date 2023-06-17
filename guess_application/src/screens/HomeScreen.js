import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from 'react-native-progress-circle';
import { useMarket } from '../context/MarketContext';
import { useCategory } from '../context/CategoryContext';

import { Icon } from 'react-native-elements';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

const HomeScreen = ({ navigation }) => {
  const {currentUserData} = useUser();
  const { categoryData } = useCategory();
  const { marketData } = useMarket();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [markets, setMarkets] = useState(marketData);
  const { logout } = useAuth();
  
  const handleLogout = () => {
      logout();
    };

  useEffect(() => {
    const initialCategory = categoryData.find(category => category.categoryName === "Tümü");
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [categoryData]);
  function onSelectCategory(category) {
    let marketList = marketData.filter(market => market.categoryName === category.categoryName);
    setMarkets(marketList);
    setSelectedCategory(category);
    if (category.categoryName === "Tümü") {
      setMarkets(marketData);
    }
  }
  useEffect(() => {
    if (selectedCategory && selectedCategory.categoryName === "Tümü") {
      setMarkets(marketData);
    } else if (selectedCategory) {
      let marketList = marketData.filter(market => market.categoryName === selectedCategory.categoryName);
      setMarkets(marketList);
    }
  }, [marketData, selectedCategory]);
  function renderContent() {
    // Verilerin yüklenip yüklenmediğini kontrol et
    if (categoryData && marketData && categoryData.length > 0 && marketData.length > 0) {
      // Eğer veriler yüklendiyse, içerikleri render et
      return (
        <View>
          {renderMainCategories()}
          {renderMarketList()}
        </View>
      );
    } else {
      // Eğer veriler yüklenmediyse, Activity Indicator'i render et
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ACB1D6" />
        </View>
      );
    }
  }
  function renderHeader(){
    return(
      <View
        style={{
          height: 350,
          width: '100%',
          paddingHorizontal: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingTop: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'flex-end',
            }}
            onPress={handleLogout}>
          <Ionicons
            name="ios-exit-outline"
            size={30}
            color="#fff"
            style={{
              marginRight: -7,
              marginTop: 7,
            }}
          />
           
          </TouchableOpacity>
         
        </View>

        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 25,
            color: '#FFF',
            paddingTop: 20,
          }}>
          Hoşgeldin 
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 15,
            color: '#FFF',
          }}>
          Oluşturulan piyasaları takip et.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#DBDFEA',
            marginTop: 15,
            marginHorizontal: 10,
            borderRadius: 20,
            paddingVertical: 20,
            paddingLeft: 30,
          }}>
          <View>
            <Text
              style={{
                color: '#345c74',
                fontSize: 20,
                fontFamily: 'Poppins-Regular',
                width: 250,
                paddingRight: 100,
              }}>
              Kendi piyasanı oluştur
            </Text>
            <TouchableOpacity
              onPress={() => navigation.push('AddMarketScreen')}
              style={{
                flexDirection: 'row',
                backgroundColor: '#f58084',
                alignItems: 'center',
                marginTop: 20,
                width: 150,
                paddingVertical: 10,
                borderRadius: 14,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                }}>
                Hemen oluştur
              </Text>
              <Image
                source={require('../assets/images/a3.png')}
                style={{marginLeft: 10, width: 8, height: 8}}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/images/undraw.png')}
            style={{marginLeft: -80, marginTop: 35}}
          />
        </View>
      </View>
    )
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            borderBottomColor: selectedCategory?.id == item.id ? '#ACB1D6' : '#FFF',
            borderBottomWidth: 4,
            paddingVertical: 6,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 30,
          }}
          onPress={() => onSelectCategory(item)}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              marginTop: 10,
              fontSize: 17,
              color: selectedCategory?.id == item.id ? '#ACB1D6' : '#9ca1a2',
            }}>
            {item.categoryName}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: 10 }}>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );
  }
  function renderMarketList() {
    return (
      <View>
      {markets.map(item => (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F6F1F1',
            paddingTop: 35,
            paddingBottom: 35,
            paddingLeft: 20,
            paddingRight: 20,
            marginHorizontal: 0,
            borderRadius: 20,
            alignItems: 'center',
            marginTop: 10,
          }}
          key={item.marketId}>
          <Image
          source={require('../assets/images/multi.png')}
          style={{width: 40, height: 40}}
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
          onPress={() => navigation.push('MarketDetail', { marketId: item.marketId })}>
          <Ionicons name="ios-arrow-forward-sharp" color="#f58084" size={30} />
        </TouchableOpacity></View>
        </View>
      ))}
    </View>
    );
  }

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#ACB1D6',
      }}>
      {renderHeader()}
      <View
      style={{
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        minHeight:500,
        flexGrow:1,
        paddingHorizontal: 25,
        paddingBottom:100
      }}>
      {renderContent()}
    </View>
    </ScrollView>
  );
};

export default HomeScreen;


