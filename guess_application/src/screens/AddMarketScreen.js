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
  TouchableNativeFeedback,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import {useAuth} from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppTextInput from '../components/AppTextInput';
import Dropdown from '../components/Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useMarket} from '../context/MarketContext';
import {useCategory} from '../context/CategoryContext';

const AddMarketScreen = ({navigation}) => {
  const [marketName, setMarketName] = useState(null);
  const [marketDescription, setMarketDescription] = useState(null);
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
  const {categoryData} = useCategory();

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

  /*source ekleme*/
  const [sources, setSources] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);
  const {format} = require('date-fns');

  const handleRemoveError = index => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };
  const handleAddSources = () => {
    if (sources.length < 3) {
      setSources([...sources, '']);
    } else {
      // validate sources
      const newErrors = [];
      newErrors.push('3"ten fazla kaynak ekleyemezsin.');

      setErrors([...errors, ...newErrors]);
      // remove errors after 5 seconds
      newErrors.forEach((_, index) => {
        setTimeout(() => {
          handleRemoveError(index);
        }, 3000);
      });
    }
  };

  const handleRemoveStock = index => {
    setSources([...sources.slice(0, index), ...sources.slice(index + 1)]);
  };

  const handleInputChange = (index, value) => {
    setSources([
      ...sources.slice(0, index),
      value,
      ...sources.slice(index + 1),
    ]);
  };

  //add category
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const iconName = isOpen ? 'search-outline' : 'ios-chevron-down-outline';

  const handleSearch = text => {
    setSearchText(text);
  };

  const handleSelect = item => {
    setSelectedItem(item);
    setIsOpen(false);
    setSearchText('');
  };

  const filteredItems = categoryData.filter(
    (item, index) =>
      index !== 0 &&
      item.categoryName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: Spacing * 2,
          }}>
          <Spinner visible={isLoading} />
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                marginTop: 8,
                marginBottom: Spacing * 2,
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
              value={marketName}
              onChangeText={text => setMarketName(text)}
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
              value={marketDescription}
              onChangeText={text => setMarketDescription(text)}
            />
            {/* Kategori ekleme */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginVertical: Spacing * 2,
              }}>
              Kategoriler
            </Text>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                onPress={toggleDropdown}
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
                <View
                  style={[
                    styles.touchable,
                    isOpen && styles.dropdownHeaderFocused,
                  ]}>
                  <View style={styles.dropdownHeader}>
                    <AppTextInput
                      style={styles.dropdownHeaderText}
                      onChangeText={handleSearch}
                      placeholder="Kategori Seçiniz"
                      onFocus={() => setIsOpen(true)}
                      onBlur={() => setIsOpen(false)}>
                      {selectedItem ? selectedItem.categoryName : ''}
                    </AppTextInput>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name={iconName}
                        color={Colors.text}
                        size={Spacing * 2}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {isOpen && (
                <ScrollView
                  style={styles.dropdownListContainer}
                  nestedScrollEnabled={true}>
                  <View style={styles.dropdownList}>
                    {filteredItems.length > 0 ? (
                      filteredItems.map(item => (
                        <TouchableNativeFeedback
                          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                          key={item.id}
                          onPress={() => handleSelect(item)}
                          activeOpacity={0.8}>
                          <View style={styles.dropdownListItem}>
                            <Text style={styles.dropdownListItemText}>
                              {item.categoryName}
                            </Text>
                          </View>
                        </TouchableNativeFeedback>
                      ))
                    ) : (
                      <Text style={styles.noResultsText}>
                        No results found.
                      </Text>
                    )}
                  </View>
                </ScrollView>
              )}
            </View>
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
              <TouchableOpacity
                onPress={addTag}
                style={{marginLeft: 10, marginTop: 10}}>
                <Ionicons
                  name="add-circle-outline"
                  color="#999"
                  size={Spacing * 2}
                />
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
            <View style={{maxWidth: 600}}>
              <TouchableOpacity
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onPress={handleAddSources}
                style={[
                  {
                    marginBottom: Spacing * 2,
                    borderRadius: Spacing,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: Spacing,
                  },
                  focused && {
                    borderWidth: 2,
                    borderColor: Colors.primary,
                    shadowOffset: {width: 4, height: Spacing},
                    shadowColor: Colors.primary,
                    shadowOpacity: 0.2,
                    elevation: 12,
                    shadowRadius: Spacing,
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                    color: '#999',
                    fontSize: 20,
                  }}>
                  + Kaynak Ekle
                </Text>
              </TouchableOpacity>
              {errors.map((error, index) => (
                <Text key={index} style={{color: 'red', marginTop: 10}}>
                  {error}
                </Text>
              ))}
              {sources.map((stock, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, marginBottom: -20}}>
                    <AppTextInput
                      value={stock}
                      onChangeText={value => handleInputChange(index, value)}
                      placeholder="Kaynak"
                    />
                  </View>
                  {sources.length > 1 && (
                    <TouchableOpacity
                      onPress={() => handleRemoveStock(index)}
                      style={{marginLeft: 10}}>
                      <Ionicons
                        name="remove-circle-outline"
                        color="#999"
                        size={Spacing * 2}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
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
              let dateParts = textDate.split('/');
              let formattedDate = `${dateParts[2]}-${dateParts[1].padStart(
                2,
                '0',
              )}-${dateParts[0].padStart(2, '0')}T${textTime.padStart(
                5,
                '0',
              )}:00.000Z`;
              addMarket({
                marketName,
                marketDescription,
                marketEndDate: formattedDate,
                marketSourceLink: sources,
                categoryName: selectedItem.categoryName,
                marketStockList: tags,
              });
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
  dropdownContainer: {
    position: 'relative',
    width: '100%',
  },
  touchable: {
    width: '100%',
  },
  dropdownHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: FontSize.small,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
  },
  dropdownHeaderFocused: {
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowOffset: {width: 4, height: Spacing},
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    elevation: 12,
    shadowRadius: Spacing,
    borderRadius: Spacing,
  },
  dropdownHeaderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: FontSize.small,
    color: '#333',
    flex: 0.6,
    padding: 10,
  },
  iconContainer: {
    width: 20,
    height: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownListContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: Spacing,
    paddingTop: 5,
    maxHeight: 130,
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownList: {
    paddingVertical: 5,
  },
  dropdownListItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownListItemText: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
    paddingHorizontal: 10,
    fontSize: FontSize.small,
  },
  noResultsText: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontStyle: 'italic',
    color: '#CCC',
  },
});

export default AddMarketScreen;
