"use client";
import axios from 'axios';
import { useEffect, useState ,useContext} from 'react'
import { useAuth } from '../../contexts/Auth';
import HomeArticle from '@/app/components/Home/HomeArticle';
import { useParams } from 'next/navigation';

function Page() {
  //URLからidを取得 
  const { id } = useParams();
  
  //ユーザのユーザ情報・作成した記事を管理する変数
  const [userarticles, setUserArticles] = useState();
  //ユーザの記事を取得
  useEffect(() => {
    async function fetchArticles() {
      //ユーザ情報を取得
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/user/${id}`);
        setUserArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    fetchArticles(); 
    }, []);

    if (!userarticles) {
      return <p>Loading...</p>; // ログイン情報がロードされるまでローディングメッセージを表示
    };

  return (
    <div>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
                <h4>{userarticles[0].user.username}</h4>
                <p>
                  Cofdounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from
                  the Hunger Games
                </p>
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow Eric Simons
                </button>
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">My Articles</a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="">Favorited Articles</a>
                  </li> */}
                </ul>
              </div>

              { userarticles.map( (article,index) => (
              <HomeArticle 
              key={index}
              title={article.title}
              userid={article.user_id}
              articleid={article.id}
              username={article.user.username}
              created_at={article.created_at}/>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page