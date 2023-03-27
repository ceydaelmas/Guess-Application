import React, {useContext} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
const AddMarketScreen = ({navigation}) => {
    return(
        <View styles={styles.container}>
            <Text>Add Market Screen</Text>
            <Button title="Click Here"
>
            </Button>
        </View>
    )
}
export default AddMarketScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
}
)