"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/Auth.js';

const Login = () => {
  //ログインに関する情報を取得
  const { login } = useAuth();
  
  // ユーザを新規登録するための関数
  const register = async (event) => {
    //画面遷移を防ぐ
    event.preventDefault();
    //フォームの内容を取得
    const emailInput = document.getElementById('Email');
    const passwordInput = document.querySelector('input[type="password"]');
    const email = emailInput.value;
    const password = passwordInput.value;
    //送信用データを作成
    const LoginData = {
      user: {
        email: email,
        password: password
      }
    };
    //送信
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/users/login', LoginData);
      const newToken = response.data.login.token;
      login(newToken);
      alert("ログインしました");
      window.location.href = '/';
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="/register">Need an account?</a>
              </p>
              <form onSubmit={register}>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" id="Email" placeholder="Email" />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
