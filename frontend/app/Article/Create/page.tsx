"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../../contexts/Auth';

const Page = () => {
  //ログイン情報を受け取る
  const { loginState } = useAuth();

  const createArticle = async(event) => {
    // 画面遷移を防ぐ
    event.preventDefault();
    //フォームの内容を取得
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const body = document.getElementById('body').value;
    //送信用のデータを作成
    const articleData = {
      article: {
        title:title,
        description: description,
        body: body,
      }
    };
    try {
      //tokenを取得
      const token = loginState(); 
      //tokenとデータをaxiosで送信
      const response = await axios.post('http://127.0.0.1:3001/api//articles', articleData,
      {
        headers: {
          'Authorization': `${token}`
        }
      });
      alert("投稿しました");
      window.location.href = '/';
    } catch (error) {
      console.error('Error fetching data:', error);
    }


  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              <li>That title is required</li>
            </ul>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Article Title" id="title"/>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="What's this article about?" id="description"/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)" id="body"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tags" />
                  <div className="tag-list">
                    <span className="tag-default tag-pill"> <i className="ion-close-round"></i> tag </span>
                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={createArticle}>
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page