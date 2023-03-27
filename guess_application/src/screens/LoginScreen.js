import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import {AuthContext} from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SocialIcon} from 'react-native-elements';
import AppTextInput from '../components/AppTextInput';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}>
        <Spinner visible={isLoading} />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: 'Poppins-Bold',
              marginVertical: Spacing * 2,
            }}>
            Tahmin Et
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.text,
              fontSize: FontSize.large,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            Tekrardan hoşgeldin, seni özledik!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 2,
          }}>
          <AppTextInput
            placeholder="Mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <AppTextInput
            placeholder="Şifre"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: 'flex-end',
            }}>
            Şifremi Unuttum
          </Text>
        </View>

        <TouchableOpacity
          style={{
            padding: Spacing * 1,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 2,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.5,
            elevation: 12,
          }}
          onPress={() => {
            login(email, password,navigation);
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.onPrimary,
              textAlign: 'center',
              fontSize: FontSize.large,
            }}>
            Giriş Yap
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            padding: Spacing,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.text,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}>
            Yeni hesap oluştur
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.primary,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}>
            Ya da
          </Text>
          <View
            style={{
              marginTop: Spacing,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.darkGray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}>
              <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.darkGray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}>
              <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// <View style={styles.container}>
//   <Spinner visible={isLoading} />
//   <View style={styles.wrapper}>
//     <TextInput
//       style={styles.input}
//       value={email}
//       placeholder="Enter email"
//       onChangeText={text => setEmail(text)}
//     />

//     <TextInput
//       style={styles.input}
//       value={password}
//       placeholder="Enter password"
//       onChangeText={text => setPassword(text)}
//       secureTextEntry
//     />

//     <Button
//       title="Login"
//       onPress={() => {
//         navigation.navigate('Home')
//         login(email, password);
//       }}

//     />

//     <View style={{flexDirection: 'row', marginTop: 20}}>
//       <Text>Don't have an account? </Text>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.link}>Register</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// </View> );};

// const styles = StyleSheet.create({
//   container: {
//     padding:Spacing*2,
//   },
//   textHeader:{
//     fontSize:FontSize.xLarge,
//     color:Colors.primary,
//     fontFamily : "Poppins-Bold"
//   },
//   wrapper: {
//     width: '80%',
//   },
//   input: {
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#bbb',
//     borderRadius: 5,
//     paddingHorizontal: 14,
//   },
//   link: {
//     color: 'blue',
//   },
// });

export default LoginScreen;
