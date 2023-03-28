import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Picker,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import {AuthContext} from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppTextInput from '../components/AppTextInput';
import Dropdown from '../components/Dropdown';
const items = [
  { id: 1, name: 'Ceyda' },
  { id: 2, name: 'ARzu' },
  { id: 3, name: 'aras' },
  { id: 4, name: 'ceylin' },
  { id: 5, name: 'hey' },
];
const AddMarketScreen = ({navigation}) => {
  const [stockName, setStockName] = useState(null);
  const [stockDescription, setStockDescription] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (

      <SafeAreaView>
        <View
          style={{
            padding: Spacing * 2,
          }}>
          <Spinner visible={isLoading} />
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.text,
                fontFamily: 'Poppins-Bold',
                marginVertical: Spacing * 2,
              }}>
              Piyasa Ekle
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: -20,
              }}>
              Lütfen tüm alanları doldurunuz
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 2,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Piyasa Adı
            </Text>
            <AppTextInput
              value={stockName}
              onChangeText={text => setStockName(text)}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Piyasa Açıklaması
            </Text>

            <AppTextInput
              multiline={true}
              numberOfLines={4}
              value={stockDescription}
              onChangeText={text => setStockDescription(text)}
            />
            <Dropdown items={items} />
          </View>

          <View
            style={{
              marginVertical: Spacing * 3,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Colors.primary,
                textAlign: 'center',
                fontSize: FontSize.small,
              }}>
              Ya da
            </Text>
            <View
              style={{
                marginTop: Spacing,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.darkGray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}>
                <Ionicons
                  name="logo-google"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.darkGray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}>
                <Ionicons
                  name="logo-facebook"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
  
  );
};
export default AddMarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
});
