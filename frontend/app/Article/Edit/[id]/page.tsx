"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../contexts/Auth';
import axios from 'axios';
import { useParams } from 'next/navigation';
const page = () => {
    //ログイン情報を受け取る
    const {loginState} = useAuth();
    //URLからidを取得 
    const { id } = useParams();
    //対象の記事を管理
    const [article, setArticle] = useState(null);
    //対象の記事を取得：idが更新されるたびに実行
    useEffect(() => {
      if (!id) return;
      async function fetchArticles() {
        try {
          const response = await axios.get(`http://127.0.0.1:3001/api/articles/${id}`);
          setArticle(response.data);

        }catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
      fetchArticles();
    }, [id]);

  
  //ユーザのデータをアップデート
    //フォームの内容を管理
    const titlRef = useRef(null);
    const descriptionRef = useRef(null);
    const bodyRef=useRef(null);

  //記事を更新する関数
  const articleUpdate = async(event)=>{
    event.preventDefault();
    //更新がなかった場合、元のデータを取得
    const articledata = {
        title:titlRef.current.value|| article.title,
        description:descriptionRef.current.value|| article.description,
        body:bodyRef.current.value|| article.body,
    };
    try {
      const token = loginState(); 
      const response = await axios.post(
        `http://127.0.0.1:3001/api/articles/${id}`,
        articledata,
      {headers: {'Authorization': `${token}`}}
      );
      window.location.href = '/';
      alert("データを更新しました")
      } catch (error) {
      console.error('Error fetching data:', error);
      }  
  };  

  //データが取得できない際は、非表示
  if (!article) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">


            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder={article.title} 
                  ref={titlRef} />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" 
                  placeholder={article.description}
                  ref={descriptionRef} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder={article.body}
                    ref={bodyRef}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tags" />
                  <div className="tag-list">
                    <span className="tag-default tag-pill"> <i className="ion-close-round"></i> tag </span>
                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={articleUpdate}>
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

export default page