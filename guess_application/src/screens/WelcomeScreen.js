import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';

const {height} = Dimensions.get('window');
const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 2.1,
          }}
          resizeMode="contain"
          source={require('../assets/images/welcome.png')}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 2,
          }}>
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily : "Poppins-Bold",
              textAlign:"center", 
            }}>
            Tahmin Et ve Kazan
          </Text>

          <Text
            style={{
              fontSize: FontSize.medium,
              color: Colors.text,
              fontFamily :"Poppins-Regular",
              textAlign:"center", 
              marginTop: Spacing*1,
            }}>
            Piyasa oluştur, tahmin et ve hisse al. Eğlenirken kazan!
          </Text>

        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: Spacing,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              height:Spacing*5,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity:0.5,
              elevation: 12,
              shadowRadius: Spacing,
              marginLeft:Spacing*1.5,
            }}
          >
            <Text
              style={{
                fontFamily:"Poppins-SemiBold",
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Giriş Yap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              paddingVertical: Spacing ,
              paddingHorizontal: Spacing * 2,
              height:Spacing*5,
              width: "48%",
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Kaydol
            </Text>
          </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({});
