import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};
export function UserProvider({ children }) {
  const [currentUserData, setCurrentUserData] = useState([]);
  const [otherUserData, setOtherUserData] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    getCurrentUserData();
  }, [token]);
    
    const fetchOtherUserByUserName = async (userName) => {
        return await fetch(`${BASE_URL}/User/get-user-by-user-name?UserName=${userName}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
    };
    const getCurrentUserData = async () => {
        return await fetch(
          `${BASE_URL}/User/get-current-user-info`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        )  .then((response) => {
          
          return response.json();
        })
        .then((data) => {
          setCurrentUserData(data);
          return data;
        });
    };
    
    //   useEffect(() => {
    //     setMarketData(marketData); // markets state'inin güncellenmesi
    //   }, [marketData]);
    //   useEffect(() => {
    //     fetchAllMarketData();
    //   }, []);
   
    
    return (
      <UserContext.Provider value={{ fetchOtherUserByUserName, currentUserData }}>
      {children}
    </UserContext.Provider>
      
    );
  };
  
