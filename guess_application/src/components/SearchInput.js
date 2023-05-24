import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import { Image } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
        <Ionicons
            name="ios-search-outline"
            size={15}
          />
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.filter}>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24 / 1.5,
  },
  inner: {
    flexDirection: 'row',
  },
  search: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  field: {
    backgroundColor: '#fff',
    paddingLeft: 48,
    paddingRight: 18,
    paddingVertical: 18,
    borderRadius: 16,
    height: 54,
    flex: 1,
    shadowColor:'#000',
    elevation:5,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  filter: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default SearchInput;