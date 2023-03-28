import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Picker,
  ScrollView,
  FlatList,
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
import AddSource from '../components/AddSource';
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
  //tags
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const {isLoading} = useContext(AuthContext);

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
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.text,
                fontFamily: 'Poppins-Bold',
                marginVertical: Spacing * 2,
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
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Categoriler
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
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
            <View>
              <AppTextInput
                value={tagInput}
                onChangeText={setTagInput}
                onSubmitEditing={addTag}
                placeholder="Senet Ekle"
              />
            </View>
            {/* source */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Kaynaklar
            </Text>
            <AddSource></AddSource>
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
