"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../contexts/Auth';

function PageContent() {
  //ログイン情報を受け取る
  const { loginState ,loginUser} = useAuth();
  //login変数でログイン情報を管理
  const [login, setLogin] = useState(null);
  //ログインしているユーザ情報を取得
  useEffect(() => {
    const fetchLoginUser = async () => {
      const user = await loginUser();
      setLogin(user);
    }
    fetchLoginUser();
  },[]);

  //URLからidを取得 
  const { id } = useParams();
  //対象の記事を管理
  const [article, setArticle] = useState(null);
  //対象の記事を取得：idが更新されるたびに実行
  useEffect(() => {
    setLogin(loginUser);
    if (!id) return;
    async function fetchArticles() {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/articles/${id}`);
        setArticle(response.data);
        console.log(response.data);
      }catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    fetchArticles();
  }, [id]);

  //データが取得できない際は、非表示
  if (!article) {
    return <div>Loading...</div>;
  }
  // データを削除する
  async function deleteArticle() {
    try {
      const token = loginState(); 
      const response = await axios.delete(`http://127.0.0.1:3001/api/articles/${id}`, 
      {headers: {'Authorization': `${token}`}});
      window.location.href = '/';
      alert("データ削除");
    }catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <a href={`/Profile/${login.id}`}><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div className="info">
              <a href={`/Profile/${login.id}`} className="author">{article.user.username}</a>
              <span className="date">{article.updated_at}</span>
            </div>
            {/* <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.user.username}<span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button> */}
          {login.id === article.user_id && (
            <>
            <a href={`/Article/Edit/${article.id}`}>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>
            </a>
            <button className="btn btn-sm btn-outline-danger" onClick={deleteArticle}>
              <i className="ion-trash-a"></i> Delete Article
            </button>            
            </>
          )}

          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>
            {article.description}
            </p>
            <h2 id="introducing-ionic">{article.title}</h2>
            <p>{article.body}</p>
            <ul className="tag-list">
              <li className="tag-default tag-pill tag-outline">realworld</li>
              <li className="tag-default tag-pill tag-outline">implementations</li>
            </ul>
          </div>
        </div>

        <hr />

        {/* <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div className="info">
              <a href="" className="author">Eric Simons</a>
              <span className="date">January 20th</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Article <span className="counter">(29)</span>
            </button> 
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>
            <button className="btn btn-sm btn-outline-danger">
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div className="card-footer">
                <a href="/profile/author" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div className="card-footer">
                <a href="/profile/author" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default PageContent;
