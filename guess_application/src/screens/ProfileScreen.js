import React, {useContext} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
const ProfileScreen = ({navigation}) => {
    return(
        <View styles={styles.container}>
            <Text>Profile Screen</Text>
            <Button title="Click Here"
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