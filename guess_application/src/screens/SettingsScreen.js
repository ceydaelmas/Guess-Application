import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import {useAuth} from '../context/AuthContext';

const SettingsScreen = ({navigation}) => {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
      };
 
  return (
    <View >
    <Text>Notification Screen</Text>
    <Button title="Click Here"  onPress={handleLogout} >               
    </Button>

</View>
  )
}
export default SettingsScreen