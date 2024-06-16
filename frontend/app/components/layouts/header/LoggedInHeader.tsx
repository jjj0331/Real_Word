import { useAuth } from '../../../contexts/Auth';

const LoggedInHeader = ({username}) => {  
  const { logout} = useAuth(); 

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  return (
    <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="/">conduit</a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
  
          <a className="nav-link active" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Article/Create"> <i className="ion-compose"></i>&nbsp;New Article </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Profile/{username}">
            <img src="" className="user-pic" />
            {username}
          </a>
        </li>
        <li className="nav-item" >
          <a className="nav-link" onClick={handleLogout}>
            <img src="" className="user-pic" />
            ログアウト
          </a>
        </li>
      </ul>
    </div>
  </nav>
  );
}

export default LoggedInHeader;
