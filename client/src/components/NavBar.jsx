import React, {Component} from 'react';
import { Link } from 'react-router'
import Login from './Login.jsx'


class NavBar extends Component {



  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
          <h2> Lists! </h2>
          <Login/>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;