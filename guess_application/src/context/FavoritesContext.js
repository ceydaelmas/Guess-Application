import React, {createContext, useContext, useState} from 'react';
import {BASE_URL} from '../config';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({children}) => {
  const { token } = useAuth();

  const getFavoritesByUserName = async userName => {
    return await fetch(
      `${BASE_URL}/Favorite/get-favorites-by-user-name?UserName=${userName}`,
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

  const addMarketToFavorites = async marketId => {
    return await fetch(
      `${BASE_URL}/Favorite/add-market-to-favorites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ MarketId: marketId }),
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      });
  };

  const removeMarketFromFavorites = async marketId => {
    return await fetch(
      `${BASE_URL}/Favorite/remove-market-from-favorites`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ MarketId: marketId }),
      },
    )
      .then(response => {
        return response.ok;
      });
  };

  return (
    <FavoritesContext.Provider
      value={{
        getFavoritesByUserName,
        addMarketToFavorites,
        removeMarketFromFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
