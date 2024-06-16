"use client";
import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";
import { useAuth } from '../../../contexts/Auth';
import React, { useEffect, useState } from 'react';

const Header = () => {
  
  const { loginState,logout,loginUser } = useAuth();  
  const [login, setLogin] = useState(null);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const checkLogin = async () => {
      const token = loginState();
      if (token) {
        const user = await loginUser();
        setUsername(user?.username || '');
        setLogin(true);
      } else {
        setLogin(false);
      }
    };
    checkLogin();
  }, []);
  
  //ログインしているかで返すコンポーネントを変える
  return login ? <LoggedInHeader username={username}/> : <LoggedOutHeader />;
}

export default Header;
