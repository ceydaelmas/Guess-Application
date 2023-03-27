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
import AppTextInputRegister from '../components/AppTextInputRegister';

const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const {isLoading, register} = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}>
        <Spinner visible={isLoading}/>  
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: 'Poppins-Bold',
              marginVertical: Spacing * 1,
            }}>
            Hesap Oluştur
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.text,
              fontSize: FontSize.small,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            Kazanmaya Başla!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 2,
          }}>
          <AppTextInputRegister
            value={firstName}
            placeholder="Adınız"
            onChangeText={text => setFirstName(text)}
          />
          <AppTextInputRegister
            value={lastName}
            placeholder="Soyadınız"
            onChangeText={text => setLastName(text)}
          />
          <AppTextInputRegister
            value={email}
            placeholder="Mail Adresiniz"
            onChangeText={text => setEmail(text)}
          />

          <AppTextInputRegister
            value={userName}
            placeholder="Kullanıcı Adınız"
            onChangeText={text => setUserName(text)}
          />

          <AppTextInputRegister
            value={password}
            placeholder="Şifreniz"
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <AppTextInputRegister
            value={confirmPassword}
            placeholder="Şifrenizi Onaylayın"
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={{
            padding: Spacing * 1,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 1,
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
            register(
              firstName,
              lastName,
              email,
              userName,
              password,
              confirmPassword,
            );
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.onPrimary,
              textAlign: 'center',
              fontSize: FontSize.large,
            }}>
            Kaydol
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            padding: Spacing,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.darkText,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}>
            Zaten bir hesabın var mı?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 2,
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
              marginTop: Spacing*0.7,
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
//   return (
//     <View style={styles.container}>
//       {/* <Spinner visible={isLoading} /> */}
//       <View style={styles.wrapper}>
//         <TextInput
//           style={styles.input}
//           value={firstName}
//           placeholder="Enter first name"
//           onChangeText={text => setFirstName(text)}
//         />
//         <TextInput
//           style={styles.input}
//           value={lastName}
//           placeholder="Enter last name"
//           onChangeText={text => setLastName(text)}

//         />

//         <TextInput
//           style={styles.input}
//           value={email}
//           placeholder="Enter email"
//           onChangeText={text => setEmail(text)}
//         />
//          <TextInput
//           style={styles.input}
//           value={userName}
//           placeholder="Enter username"
//           onChangeText={text => setUserName(text)}
//         />

//         <TextInput
//           style={styles.input}
//           value={password}
//           placeholder="Enter password"
//           onChangeText={text => setPassword(text)}
//           secureTextEntry
//         />
//         <TextInput
//           style={styles.input}
//           value={confirmPassword}
//           placeholder="Confirm password"
//           onChangeText={text => setConfirmPassword(text)}
//           secureTextEntry
//         />

//         <Button
//           title="Register"
//           onPress={() => {
//             register(firstName,lastName, email,userName,password,confirmPassword);
//           }}
//         />

//         <View style={{flexDirection: 'row', marginTop: 20}}>
//           <Text>Already have an accoutn? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//             <Text style={styles.link}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
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

export default RegisterScreen;
