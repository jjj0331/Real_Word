"use client";
import React from 'react'
import HomeArticle from './HomeArticle'
import { useEffect, useState ,useContext } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/contexts/Auth';

const HomeContent = () => {
  //ログイン情報を受け取る
  const { loginUser} = useAuth();
  //login変数でログイン情報を管理
  const [login, setLogin] = useState(null);
  //loginUserに変更があった場合、実行
  useEffect(() => {
    async function fetchUser() {
      if (loginUser) {
        const user = await loginUser();
        setLogin(user);
      }
    }
    fetchUser();
  }, [loginUser]);
  
  //articlesで全部の記事を管理
  const [articles, setArticles] = useState([]);
  //APIをたたく(最初のレンダリングのみ)
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    fetchArticles(); 
    }, []);
  

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
              {login !== null && (
                <li className="nav-item">
                  <a className="nav-link" 
                     href={`/Profile`}>Your Feed</a>
                </li>
              )}
                <li className="nav-item">
                  <a className="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            { articles.map( (article,index) => (
              <HomeArticle 
              key={index}
              title={article.title}
              username={article.user.username}
              userid={article.user_id}
              created_at={article.created_at}
              articleid={article.id}
              />
            ))} 

            {/* <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="">2</a>
              </li>
            </ul> */}
          </div>

          <div className="col-md-3">
            {/* <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContent