import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import * as SecureStore from 'expo-secure-store';
import {useContext} from 'react';
import { useAuth } from './AuthContext';

const MarketContext = createContext();
export const useMarket = () => {
  return useContext(MarketContext);
};
export const MarketProvider = ({children}) => {
  const [marketData, setMarketData] = useState([]);
  const [currentUserMarkets, setCurrentUserMarkets] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    getAllMarketsForCurrentUser();
  }, [token]);

  const fetchAllMarketData = () => {
    fetch(`${BASE_URL}/Market/get-all-confirmed-markets`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMarketData(data);
      });
  };

  const fetchMarketById = async marketId => {
    return await fetch(
      `${BASE_URL}/Market/get-market-by-id?MarketId=${marketId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      });
  };

  const getAllMarketsForCurrentUser = async () => {
    console.log("şu an get current market ", token);
      return await fetch(
        `${BASE_URL}/Market/get-all-markets-for-current-user`,
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
        setCurrentUserMarkets(data);
        return data;
      });
  };

  const getAllMarketsForOtherUser = async userName => {
    return await fetch(
      `${BASE_URL}/Market/get-all-markets-by-user-name?UserName=${userName}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      });
  };
  const addMarket = async (market) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/Market/add-market`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: market
      });
      
      if (response.data) {
        // Burada başarılı olması durumunda yapılacaklar
        fetchAllMarketData();
      }
    } catch (error) {
      // Burada hata durumunda yapılacaklar
      console.error('There was an error!', error);
    }
  };
  
  useEffect(() => {
    setMarketData(marketData); // markets state'inin güncellenmesi
  }, [marketData]);
  useEffect(() => {
    fetchAllMarketData();
  }, [marketData]);

  return (
    <MarketContext.Provider
      value={{
        marketData,
        fetchMarketById,
        currentUserMarkets,
        getAllMarketsForOtherUser,
        addMarket 
      }}>
      {children}
    </MarketContext.Provider>
  );
};
