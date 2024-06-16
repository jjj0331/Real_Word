"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from './../contexts/Auth.js';
import axios from 'axios';

function Page() {
  //ログイン情報を受け取る
  const { loginUser,loginState} = useAuth();

  //login変数でログイン情報を管理
  const [login, setLogin] = useState(null);

  //最初のレンダリング時に実行
  useEffect(() => {
    async function fetchUser() {
      const user = await loginUser();
      setLogin(user);
      console.log(user);
    }
    fetchUser();
  }, []);

  //フォームの内容を管理
  const userImageInputRef = useRef(null);
  const userNameInputRef = useRef(null);
  const userBioInputRef=useRef(null);
  const userEmailInputRef=useRef(null);
  const userPasswordInputRef=useRef(null);

  //ユーザのデータをアップデート
  const UserUpdate = async(event)=>{
    event.preventDefault();
  
    const userData = {
      user: {
        id:login.id,
        image:userImageInputRef.current.value|| login.image,
        username:userNameInputRef.current.value||login.username,
        bio:userBioInputRef.current.value||login.bio,
        email:userEmailInputRef.current.value||login.email,
        password: userPasswordInputRef.current.value||login.password,
      }
    };

    try {
      const token = loginState(); 
      const response = await axios.post('http://127.0.0.1:3001/api/user/update', userData,
      {headers: {'Authorization': `${token}`}}
      );
      window.location.href = '/';
      alert("データを更新しました")
      } catch (error) {
      console.error('Error fetching data:', error);
      }  


  };
  
  // ログイン情報がロードされるまでローディングメッセー ジを表示
  if (!login) {
    return <p>Loading...</p>;
  };
  return (
    <div>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ul className="error-messages">
                <li>That name is required</li>
              </ul>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input className="form-control" type="text" 
                    placeholder={login.image}
                    ref={userImageInputRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" placeholder={login.username} 
                    ref={userNameInputRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder={login.bio}
                      ref={userBioInputRef}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" placeholder={login.email} 
                    ref={userEmailInputRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                      ref={userPasswordInputRef}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right"
                   onClick={UserUpdate}
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button className="btn btn-outline-danger" 
              // ログアウト機能
              onClick={()=>{
                logout;
                window.location.href = '/';
                }}>Or click here to logout.</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page