import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import * as SecureStore from 'expo-secure-store';
import {useContext} from 'react';
import {useAuth} from './AuthContext';

const TransactionContext = createContext();

export const useTransaction = () => {
  return useContext(TransactionContext);
};

export const TransactionProvider = ({children}) => {
  const [userTransactions, setUserTransactions] = useState([]);

  const {token} = useAuth();

  const makeTransaction = async (marketId, stockId, transactionAmount) => {
    const transactionDetails = {
      marketId,
      stockId,
      transactionAmount,
    };

    return await axios({
      method: 'post',
      url: `${BASE_URL}/Transaction/make-transaction`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: transactionDetails,
    })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <TransactionContext.Provider
      value={{
        makeTransaction,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
