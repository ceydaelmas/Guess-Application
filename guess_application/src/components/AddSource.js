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
const AddSource = ({navigation}) => {
  //source
  const [passengers, setPassengers] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);
  //source
  const handleRemoveError = index => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };
  const handleAddPassenger = () => {
    if (passengers.length < 3) {
      setPassengers([...passengers, '']);
    } else {
      // validate passengers
      const newErrors = [];
      newErrors.push('You cannot add more than 3 sources.');

      setErrors([...errors, ...newErrors]);
      // remove errors after 5 seconds
      newErrors.forEach((_, index) => {
        setTimeout(() => {
          handleRemoveError(index);
        }, 3000);
      });
    }
  };

  const handleRemovePassenger = index => {
    setPassengers([
      ...passengers.slice(0, index),
      ...passengers.slice(index + 1),
    ]);
  };

  const handleInputChange = (index, value) => {
    setPassengers([
      ...passengers.slice(0, index),
      value,
      ...passengers.slice(index + 1),
    ]);
  };

  const handleSubmit = () => {
    if (passengers.length < 1) {
      setErrors(['At least 1 passengers']);
      return;
    }

    // Handle form submission with passengers array
    console.log('Passengers:', passengers);
  };
  return (
    <View style={{maxWidth: 600}}>
      <TouchableOpacity
       onFocus={() => setFocused(true)}
       onBlur={() => setFocused(false)}
        onPress={handleAddPassenger}
        style={[{
          marginVertical: Spacing,
          borderRadius: Spacing,
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: Spacing * 1.5,
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
          + Add Source
        </Text>
      </TouchableOpacity>
      {errors.map((error, index) => (
        <Text key={index} style={{color: 'red', marginTop: 10}}>
          {error}
        </Text>
      ))}
      {passengers.map((passenger, index) => (
        <View
          key={index}
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, marginBottom: -20}}>
            <AppTextInput
              value={passenger}
              onChangeText={value => handleInputChange(index, value)}
              placeholder="Source"
            />
          </View>
          {passengers.length > 1 && (
            <TouchableOpacity
              onPress={() => handleRemovePassenger(index)}
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
