import React, {createContext, useContext, useState} from 'react';
import {BASE_URL} from '../config';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  const { token } = useAuth();

  const getFavoritesByUserName = async userName => {
    return await fetch(
      `${BASE_URL}/Favorite/get-favorites-by-user-name?UserName=${userName}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        setFavorites(data);
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
        setFavorites([...favorites, data]);
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
        if (response.ok) {
          setFavorites(favorites.filter(fav => fav.marketId !== marketId));
        }
        return response.ok;
      });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        getFavoritesByUserName,
        addMarketToFavorites,
        removeMarketFromFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
