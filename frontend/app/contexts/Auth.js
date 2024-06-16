"use client";
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  //子要素を受け取る
  const { children } = props;

  // ログイン時にトークンを保存
  const login = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  };

  // ログアウト時にトークンを削除
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      
    }
  };

  // ログインしているユーザを取得
  const loginUser = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:3001/api/users/login', {
            headers: {
              'Authorization': `${token}`
            }
          });
    
          return response.data; 
        } catch (error) {
          console.error('Error fetching login state:', error);
          return null; 
        }
      }
    }
    return null; 
  };

  // ログインしているユーザを取得
  const loginState = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('auth_token');
    }
    return null;
  };

  const value = {
    login,
    logout,
    loginState,
    loginUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuthフックをエクスポート
export const useAuth = () => {
  return useContext(AuthContext);
};