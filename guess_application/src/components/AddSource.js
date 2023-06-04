import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Colors from '../constants/Colors';

import Spacing from '../constants/Spacing';

import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddSource = ({navigation}) => {
  //source
  const [sources, setSources] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);

  //source
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
    setSources([...sources.slice(0, index), value, ...sources.slice(index + 1)]);
  };

  const handleSubmit = () => {
    if (sources.length < 1) {
      setErrors(['En az 1 kaynak eklemek zorundasın']);
      return;
    }

    // Handle form submission with stock array
    console.log('Sources:', sources);
  };
  return (
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
  );
};
export default AddSource;
