import React, {useContext} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({navigation}) => {
    const {logout} = useAuth;

    return(
        <View styles={styles.container}>
            <Text>Profile Screen</Text>
            <Button title="Click Here"
             onPress={() => {
                logout(navigation);
              }}
>
            </Button>
        </View>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
}
)