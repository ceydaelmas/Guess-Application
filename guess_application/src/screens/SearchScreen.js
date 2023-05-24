import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import ProfileTabView from '../components/ProfileTabView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';

const SearchScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <View 
    style={{flex:1,backgroundColor:'#fbfbfb',
    minHeight: 500,
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 100,}}>
   <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
          color: '#345c74',
          paddingTop: 30,
        }}>
        Piyasa Bul
      </Text>
      <SearchInput/>
    </View>
  );
};
export default SearchScreen;
