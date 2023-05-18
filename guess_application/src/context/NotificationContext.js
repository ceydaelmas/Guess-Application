import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();
export const useNotification = () => {
  return useContext(NotificationContext);
};
export function NotificationProvider({ children }) {
  const [notificationData, setNotificationData] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    getUserNotification();
  }, [token]);
    
    const getUserNotification = async () => {
        return await fetch(
          `${BASE_URL}/Notification/get-notifications-to-current-user`,
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
          console.log("notification", data)
          setNotificationData(data);
          return data;
        });
    };
    
    
    return (
      <NotificationContext.Provider value={{ notificationData }}>
      {children}
    </NotificationContext.Provider>
      
    );
  };
  
