"use client";
import React from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/Auth';

const Page = () => {
  //ログイン情報を取得
  const { login ,logout} = useAuth();
  //新規登録処理
  const register= async (event)=>{
    event.preventDefault();

    //Formからデータを取得
    const usernameInput = document.getElementById('Username');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.querySelector('input[type="password"]');
    const username = usernameInput.value;
    const email    = emailInput.value;
    const password = passwordInput.value;
    //送信用データを作成
    const userData = {
      user: {
        username:username,
        email: email,
        password: password,
      }
    };
    //送信
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/users/', userData);
      console.log('Response data:', response.data);  
      logout();
      const newToken = response.data.token;
      login(newToken);
      alert("新規ユーザを登録しました");
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
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                  <a href="/login">Have an account?</a>
                </p>

                <ul className="error-messages">
                  <li>That email is already taken</li>
                </ul>

                <form>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" id="Username" placeholder="Username" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" id="Email" placeholder="Email" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="password" placeholder="Password" />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right" onClick={register}>Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Page