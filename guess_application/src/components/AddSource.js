import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

import Spacing from '../constants/Spacing';

import AppTextInput from '../components/AppTextInput';

const AddSource = ({navigation}) => {
  //source
  const [stocks, setStocks] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);
  
  //source
  const handleRemoveError = index => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };
  const handleAddStock = () => {
    if (stocks.length < 3) {
      setStocks([...stocks, '']);
    } else {
      // validate stocks
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
    setStocks([
      ...stocks.slice(0, index),
      ...stocks.slice(index + 1),
    ]);
  };

  const handleInputChange = (index, value) => {
    setStocks([
      ...stocks.slice(0, index),
      value,
      ...stocks.slice(index + 1),
    ]);
  };

  const handleSubmit = () => {
    if (stocks.length < 1) {
      setErrors(['En az 1 kaynak eklemek zorundasın']);
      return;
    }

    // Handle form submission with stock array
    console.log('Stocks:', stocks);
  };
  return (
    <View style={{maxWidth: 600}}>
      <TouchableOpacity
       onFocus={() => setFocused(true)}
       onBlur={() => setFocused(false)}
        onPress={handleAddStock}
        style={[{
          marginBottom: Spacing *2,
          borderRadius: Spacing,
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: Spacing,
        },focused && {
            borderWidth: 2,
            borderColor: Colors.primary,
            shadowOffset: { width: 4, height: Spacing },
            shadowColor: Colors.primary,
            shadowOpacity: 0.2,
            elevation:12,
            shadowRadius: Spacing,
          },]}>
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
      {stocks.map((stock, index) => (
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
          {stocks.length > 1 && (
            <TouchableOpacity
              
              onPress={() => handleRemoveStock(index)}
              style={{marginLeft: 10}}>
              <Text style={{color: '#999', fontSize: 24}}>&ndash;</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
};
export default AddSource;
