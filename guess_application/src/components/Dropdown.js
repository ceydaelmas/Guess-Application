import React, { useState } from 'react';
import { View, Text,TouchableOpacity,TouchableNativeFeedback, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import AppTextInput from './AppTextInput';
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Ionicons from 'react-native-vector-icons/Ionicons';


const items = [
  { id: 1, label: 'Ceydda' },
  { id: 2, label: 'Arzu' },
  { id: 3, label: 'Ceylin' },
  { id: 4, label: 'Aras' },
  { id: 5, label: 'beliz' },
  { id: 6, label: 'Arzuhhj' },
  { id: 7, label: 'Ceylinhjg' },
  { id: 8, label: 'Arashj' },
  { id: 9, label: 'belizgj' },
];
const Dropdown = () => {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const iconName = isOpen ? 'search-outline' : 'ios-chevron-down-outline';

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    setSearchText('');
  };

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }} >
        <View
          style={[
            styles.touchable,
            isOpen && styles.dropdownHeaderFocused,
          ]}
        >
          <View style={styles.dropdownHeader}>
            <AppTextInput
              style={styles.dropdownHeaderText}
              onChangeText={handleSearch}
              placeholder='Kategori Seçiniz'
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
            >
              {selectedItem ? selectedItem.label : ''}
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
          nestedScrollEnabled={true}
        >
          <View style={styles.dropdownList}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TouchableNativeFeedback 
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                  key={item.id}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.8}
                >
                  <View style={styles.dropdownListItem}>
                    <Text style={styles.dropdownListItemText}>{item.label}</Text>
                  </View>
                </TouchableNativeFeedback >
              ))
            ) : (
              <Text style={styles.noResultsText}>No results found.</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
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
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    elevation:12,
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
    right:20,
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
    maxHeight:130,
    
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
    
    export default Dropdown;
