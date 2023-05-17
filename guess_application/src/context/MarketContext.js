import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

const MarketContext = createContext();
export const useMarket = () => {
  return useContext(MarketContext);
};
export const MarketProvider = ({children}) => {
    const [marketData, setMarketData] = useState([]);
  
    const fetchAllMarketData = () => {
        fetch(`${BASE_URL}/Market/get-all-confirmed-markets`, {
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
            setMarketData(data);
          });
      };
      useEffect(() => {
        setMarketData(marketData); // markets state'inin güncellenmesi
      }, [marketData]);
      useEffect(() => {
        fetchAllMarketData();
      }, []);
   
    
    return (
      <MarketContext.Provider
        value={{
            marketData
        }}>
        {children}
      </MarketContext.Provider>
    );
  };
  
