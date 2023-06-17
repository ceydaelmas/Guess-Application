import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useMarket} from '../context/MarketContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const {marketData} = useMarket();
  
  useEffect(() => {
    setData(marketData);
    setOldData(marketData);
  }, []);

  const searchFilterFunction = text => {
    if (text !== '') {
      let tempData = data.filter(item => {
        const itemData = `${item.marketName.toUpperCase()}   
                        ${item.marketDescription.toUpperCase()}`;
        
        const textData = text.toUpperCase();
          
        return itemData.indexOf(textData) > -1;
      });
      setData(tempData);
    } else {
      setData(oldData);
    }
  };
  
  return (
    <View style={{flex: 1,minHeight: 780, backgroundColor: '#fff'}}>
          <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
          color: '#345c74',
          paddingTop: 30,
          paddingLeft:25,
        }}>
        Arama Yap
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
          
        <View
          style={{
            width: '80%',
            height: 50,
            borderRadius: 10,
            borderWidth:1,
            borderColor:'#345c74',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
          }}>
            <Ionicons
            name="ios-search-outline"
            size={20}
            color={'#345c74'}
            style={{ marginLeft: 15 }}
          />
      
          <TextInput
            ref={searchRef}
            placeholder="Piyasa Ara"
            style={{width: '76%', height: 50}}
            value={search}
            onChangeText={txt => {
              searchFilterFunction(txt);
              setSearch(txt);
            }}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => {
                searchRef.current.clear();
                searchFilterFunction('');
                setSearch('');
              }}>
              <Image
                source={require('../assets/images/x.png')}
                style={{width: 16, height: 16, opacity: 0.5}}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => {
            setVisible(true);
          }}>
            <Ionicons
            name="ios-filter-outline"
            size={28}
            color={'#345c74'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({item, index}) => {
          return (
            <View
            style={{
              backgroundColor: '#FFF',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              flexGrow: 1,
              paddingHorizontal: 25,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('MarketDetail', {marketId: item.marketId})
              }>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#F6F1F1',
                      paddingTop: 20,
                      paddingBottom: 20,
                      paddingLeft: 20,
                      paddingRight: 20,
                      marginHorizontal: 0,
                      paddingHorizontal: 25,
                      borderRadius: 20,
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    key={item.marketId}>
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
                            color: '#345c74',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 15,
                            paddingLeft:20,
                          }}>
                          {item.marketDescription}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: '#f58084',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 15,
                          paddingHorizontal: 20,
                        }}>
                        {item.marketOperationNumber} işlem yapıldı{' '}
                      </Text>
                    </View>
                   
                  </View>
                </View>
             
            </TouchableOpacity> 
            </View>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 100,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(1);
                const strAscending = data.sort((a, b) =>
                  a.marketName > b.marketName ? 1 : -1,
                );
                setData(strAscending);
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}> İsme Göre Sırala</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(2);
                setData(data.sort((a, b) => b.marketOperationNumber - a.marketOperationNumber));
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                En Popüler Piyasalar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchScreen;
