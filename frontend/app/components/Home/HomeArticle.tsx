import React from 'react'

const HomeArticle = ({ 
  title,
  articleid,
  username,
  created_at,
  userid
  }) => {
  
  return (
    <div className="article-preview">
    <div className="article-meta">
    {/* ユーザ画面   */}
      <a href={`/Profile/${userid}`}>
        <img src="http://i.imgur.com/N4VcUeJ.jpg" />
      </a>

      <div className="info">
    {/* ユーザ名 */}
        <a href={`/Profile/${userid}`} className="author">{username}</a>
        <span className="date">{created_at}</span>
      </div>
      {/* <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> 32
      </button> */}
    </div>
    <a href={`/Article/${articleid}`} className="preview-link">
      <h1>{title}</h1>
      <p>This is the description for the post.</p>
      <span>Read more...</span>
      {/* <ul className="tag-list">
        <li className="tag-default tag-pill tag-outline">realworld</li>
        <li className="tag-default tag-pill tag-outline">implementations</li>
      </ul> */}
    </a>
  </div>
  )
}

export default HomeArticle