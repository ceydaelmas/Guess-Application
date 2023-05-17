import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import { useContext } from 'react';

const CategoryContext = createContext();
export const useCategory = () => {
  return useContext(CategoryContext);
};
export const CategoryProvider = ({children}) => {
    const [categoryData, setCategoryData] = useState([]);

    const fetchAllCategoryData = () => {
        fetch(`${BASE_URL}/Category/get-all-categories`, {
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
            console.log("cateoryy",data);
            setCategoryData(data);
          });
      };
      useEffect(() => {
        fetchAllCategoryData();
      }, []);
    
    return (
      <CategoryContext.Provider
        value={{
            categoryData
        }}>
        {children}
      </CategoryContext.Provider>
    );
  };
  
