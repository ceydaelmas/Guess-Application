import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const register = async (
    firstName,
    lastName,
    email,
    userName,
    password,
    confirmPassword,
  ) => {
    setIsLoading(true);
    await axios
      .post(`${BASE_URL}/Account/register`, {
        firstName,
        lastName,
        email,
        userName,
        password,
        confirmPassword,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.error(JSON.stringify(e.response.data));
        setIsLoading(false);
      });
  };

  const login = (email, password,navigation) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/Account/authenticate`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        navigation.navigate('Tabs');
      })
      .catch(e => { 
        navigation.navigate('Login');
        console.error(JSON.stringify(e.response.data));
        setIsLoading(false);
      });
  };

  const logout = (navigation) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/Account/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.data.jwToken}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        navigation.navigate('Welcome');
        setUserInfo({});
        setIsLoading(false);
        
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${JSON.stringify(e.response.data)}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};
