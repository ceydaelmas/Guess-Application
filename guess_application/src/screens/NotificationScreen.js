import React, {useContext} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import ProfileTabView from '../components/ProfileTabView';
const NotificationScreen = ({navigation}) => {
    return(
        <View styles={styles.container}>
            <Text>Notification Screen</Text>
            <Button title="Click Here"
>               
            </Button>

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


{/* <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
<View style={{ alignItems: "center" }}>
    <View style={styles.recentItem}>
        <View style={styles.activityIndicator}></View>
        <View style={{ width: 250 }}>
            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
            </Text>
        </View>
    </View>

    <View style={styles.recentItem}>
        <View style={styles.activityIndicator}></View>
        <View style={{ width: 250 }}>
            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
            </Text>
        </View>
    </View>
</View> */}


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFF"
//     },
//     text: {
//         fontFamily: "HelveticaNeue",
//         color: "#52575D"
//     },
//     image: {
//         flex: 1,
//         height: undefined,
//         width: undefined
//     },
//     titleBar: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 24,
//         marginHorizontal: 16
//     },
//     subText: {
//         fontSize: 12,
//         color: "#AEB5BC",
//         textTransform: "uppercase",
//         fontWeight: "500"
//     },
//     profileImage: {
//         width: 200,
//         height: 200,
//         borderRadius: 100,
//         overflow: "hidden"
//     },
//     dm: {
//         backgroundColor: "#41444B",
//         position: "absolute",
//         top: 20,
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     active: {
//         backgroundColor: "#34FFB9",
//         position: "absolute",
//         bottom: 28,
//         left: 10,
//         padding: 4,
//         height: 20,
//         width: 20,
//         borderRadius: 10
//     },
//     add: {
//         backgroundColor: "#41444B",
//         position: "absolute",
//         bottom: 0,
//         right: 0,
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     infoContainer: {
//         alignSelf: "center",
//         alignItems: "center",
//         marginTop: 16
//     },
//     statsContainer: {
//         flexDirection: "row",
//         alignSelf: "center",
//         marginTop: 32
//     },
//     statsBox: {
//         alignItems: "center",
//         flex: 1
//     },
//     mediaImageContainer: {
//         width: 180,
//         height: 200,
//         borderRadius: 12,
//         overflow: "hidden",
//         marginHorizontal: 10
//     },
//     mediaCount: {
//         backgroundColor: "#41444B",
//         position: "absolute",
//         top: "50%",
//         marginTop: -50,
//         marginLeft: 30,
//         width: 100,
//         height: 100,
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 12,
//         shadowColor: "rgba(0, 0, 0, 0.38)",
//         shadowOffset: { width: 0, height: 10 },
//         shadowRadius: 20,
//         shadowOpacity: 1
//     },
//     recent: {
//         marginLeft: 78,
//         marginTop: 32,
//         marginBottom: 6,
//         fontSize: 10
//     },
//     recentItem: {
//         flexDirection: "row",
//         alignItems: "flex-start",
//         marginBottom: 16
//     },
//     activityIndicator: {
//         backgroundColor: "#CABFAB",
//         padding: 4,
//         height: 12,
//         width: 12,
//         borderRadius: 6,
//         marginTop: 3,
//         marginRight: 20
//     }
// });