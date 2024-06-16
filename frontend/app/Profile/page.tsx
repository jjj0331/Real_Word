"use client";
import axios from 'axios';
import { useEffect, useState ,useContext} from 'react'
import { useAuth } from '../contexts/Auth';
import HomeArticle from '@/app/components/Home/HomeArticle';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function Page() {
  //ログイン情報を受け取る
  const { loginUser,loginState} = useAuth();

  //URLからidを取得 
  const { id } = useParams();

  //login変数でログイン情報を管理
  const [login, setLogin] = useState(null);

  //loginUserに変更があった場合、実行
  useEffect(() => {
    async function fetchUser() {
      const user = await loginUser();
      setLogin(user);
      console.log(user);
    }
    fetchUser();
  }, [loginUser]);

  //プロフィール内容及び、作者が投稿した記事を取得
  const [userarticles, setUserArticles] = useState();
  useEffect(() => {
    async function fetchArticles() {
      if (!login) {
        return;
      }

      try {
        const token = loginState(); 
        const response = await axios.get(`http://127.0.0.1:3001/api/user/${login.id}`, {
          headers: {
            Authorization: `${token}`
          }
        });
        setUserArticles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    fetchArticles(); 
    
    }, [login]);

    // ログイン情報がロードされるまでローディングメッセー ジを表示
    if (!login || !userarticles) {
      return <p>Loading...</p>;
    };

  return (
    <div>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
                <h4>{login.username}</h4>
                <p>
                  ここにはユーザの自己紹介文が入る...【未実装】
                </p>
                {/* <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow Eric Simons
                </button> */}
                <Link href="/Settings">
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a"></i>
                    &nbsp; Edit Profile Settings
                  </button>
                </Link>
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