import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useCallback, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import * as SecureStore from 'expo-secure-store';
import {useContext} from 'react';
import {useAuth} from './AuthContext';

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};
export function UserProvider({children}) {
  const [currentUserData, setCurrentUserData] = useState([]);
  const [otherUserData, setOtherUserData] = useState([]);
  const {token} = useAuth();

  const fetchOtherUserByUserName = async userName => {
    return await fetch(
      `${BASE_URL}/User/get-user-by-user-name?UserName=${userName}`,
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
  const getCurrentUserData = useCallback(async () => {
    return await fetch(`${BASE_URL}/User/get-current-user-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCurrentUserData(data);
        console.log('currentuser', data); // <-- burada data kullanarak log atabilirsiniz.
        return data;
      });
  }, [token]); // <-- token değiştiğinde getCurrentUserData güncellenecek.

  useEffect(() => {
    getCurrentUserData();
  }, [getCurrentUserData]);
  const getAllFollowers = async userName => {
    const response = await fetch(
      `${BASE_URL}/User/get-all-followers?UserName=${userName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      },
    );

    const data = await response.json();
    return data;
  };

  const getAllFollowing = async userName => {
    const response = await fetch(
      `${BASE_URL}/User/get-all-following?UserName=${userName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      },
    );
    console.log('context içindeyim', data);
    const data = await response.json();
    return data;
  };

  const followUser = async followingUserName => {
    const response = await fetch(`${BASE_URL}/User/follow-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        followingUserName,
      }),
    });
    const data = await response.json();
    return data;
  };
  const unfollowUser = async unFollowingUserName => {
    const response = await fetch(`${BASE_URL}/User/unfollow-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        unFollowingUserName,
      }),
    });
    const data = await response.json();
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        fetchOtherUserByUserName,
        currentUserData,
        followUser,
        unfollowUser,
        getAllFollowers,
        getAllFollowing,
      }}>
      {children}
    </UserContext.Provider>
  );
}
