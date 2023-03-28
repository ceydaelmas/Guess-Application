import React, { useState } from 'react';
import { View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const Dropdown = ({ items}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <View style={{ maxHeight: 135 }}>
      <SearchableDropdown
        items={items}
        onItemSelect={handleItemSelect}
        selectedItems={selectedItem}
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          backgroundColor: '#fff',
        }}
        onTextChange={(text) => console.log(text)}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#fff',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        selectedItemTextStyle={{ color: '#222' }}
        resetValue={false}
        placeholder = "seç"
        underlineColorAndroid="transparent"
        
      />
    </View>
    
  );
};

export default Dropdown;