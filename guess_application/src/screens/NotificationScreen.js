import React, {useContext} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
const NotificationScreen = ({navigation}) => {
    return(
        <View styles={styles.container}>
            <Text>Notification Screen</Text>
        </View>
    )
}
export default NotificationScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
}
)