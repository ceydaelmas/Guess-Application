import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Picker,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppTextInput from '../components/AppTextInput';
import Dropdown from '../components/Dropdown';

import AddSource from '../components/AddSource';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMarket } from '../context/MarketContext';
const items = [
  {id: 1, name: 'Ceyda'},
  {id: 2, name: 'ARzu'},
  {id: 3, name: 'aras'},
  {id: 4, name: 'ceylin'},
  {id: 5, name: 'hey'},
];
const AddMarketScreen = ({navigation}) => {
  const [stockName, setStockName] = useState(null);
  const [stockDescription, setStockDescription] = useState(null);
  {
    /* Senet ekleme */
  }
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  {
    /* Piyasa kapanma tarihi ekleme */
  }
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textDate, setDateText] = useState('Tarih');
  const [textTime, setTimeText] = useState('Saat');
  const currentDate = new Date();
  const {isLoading} = useAuth();
  const {addMarket} = useMarket();

  {
    /* Piyasa kapanma tarihi ekleme */
  }
  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

    setDateText(fDate);
    setTimeText(fTime);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  {
    /* Senet ekleme */
  }
  const deleteTag = tag => {
    setTags(tags.filter(t => t !== tag));
  };

  const addTag = () => {
    const newTags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== '');
    setTags([...tags, ...newTags]);
    setTagInput('');
  };

  return (
    <ScrollView>
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
                <TouchableOpacity
              onPress={() => navigation.goBack()}>
             <Ionicons
                name="ios-arrow-back-sharp"
                color="#1D267D"
                size={Spacing * 3}
              />
            </TouchableOpacity>
               
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.text,
                fontFamily: 'Poppins-Bold',
                marginTop:8,
                marginBottom:Spacing*2,
              }}>
              Piyasa Oluştur
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
            {/* Piyasa adı ekleme */}
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
            {/* Piyasa açıklaması ekleme */}
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
            {/* Kategori ekleme */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginVertical: Spacing * 2,
              }}>
              Kategoriler
            </Text>
            <Dropdown />
            {/* Senet ekleme */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginVertical: Spacing * 2,
              }}>
              Senetler
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {tags.map(tag => (
                <View
                  key={tag}
                  style={{
                    backgroundColor: Colors.primary,
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    marginRight: 8,
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: Colors.gray, marginRight: 4}}>
                    {tag}
                  </Text>
                  <TouchableOpacity onPress={() => deleteTag(tag)}>
                    <Ionicons
                      name="close-circle-outline"
                      color={Colors.gray}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{flex: 1, marginBottom: -20}}>
              <AppTextInput
                value={tagInput}
                onChangeText={setTagInput}
                onSubmitEditing={addTag}
                placeholder="Senet Ekle"
              />
            </View>
            <TouchableOpacity onPress={addTag} style={{marginLeft:10, marginTop:10}}>
              <Ionicons name="add-circle-outline" color='#999' size={Spacing * 2} />
            </TouchableOpacity>
            </View>
            {/* Piyasa kaynağı ekleme */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginVertical: Spacing * 2,
              }}>
              Kaynaklar
            </Text>
            <AddSource></AddSource>
            {/* Piyasa kapanış tarihi ekleme */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginVertical: Spacing * 2,
              }}>
              Piyasa Kapanış Tarihi
            </Text>
            <View flexDirection="row">
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  padding: 15,
                  borderColor: Colors.darkGray,
                  borderRadius: Spacing,
                }}
                onPress={() => showMode('date')}>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  {textDate}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  padding: 15,
                  borderColor: Colors.darkGray,
                  borderRadius: Spacing,
                }}
                onPress={() => showMode('time')}>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  {textTime}
                </Text>
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testId="dateTimePicker"
                minimumDate={currentDate}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          <TouchableOpacity
            style={{
              padding: Spacing * 1,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 2,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.5,
              elevation: 12,
            }}
            onPress={() => {
              login(email, password, navigation);
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Colors.onPrimary,
                textAlign: 'center',
                fontSize: FontSize.large,
              }}>
              Oluştur
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
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
