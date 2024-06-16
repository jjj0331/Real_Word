const LoggedOutHeader = () => {
  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">conduit</a>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>  
            <li className="nav-item">
              <a className="nav-link" href="/Login">Sign in</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Register">Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default LoggedOutHeader;
