import React from "react";
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{backgroundColor: '#152C5B'}}>
      <ul className="navbar-nav">
        <li className="nav-item" style={{marginRight: '20px'}}>
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" style={{color: 'white'}} />
          </a>
        </li>
        <li className="nav-item d-sm-inline-block" style={{marginRight: '20px'}}>
          <Link to="/dashboard">
            <a href="#" className="nav-link" style={{color: 'white'}}>
              <i className="fas fa-home" style={{color: 'white'}} />
            </a>
          </Link>
        </li>
        <li className="nav-item d-sm-inline-block" style={{marginRight: '20px'}}>
          <Link to="/dashboard/profile">
            <a href="#" className="nav-link" style={{color: 'white'}}>
              <i className="fas fa-id-badge" style={{color: 'white'}} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
