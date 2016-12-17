import React, {Component} from 'react';
import { Link } from 'react-router'
import LoginContainer from '../containers/LoginContainer.js'


class NavBar extends Component {

  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
          <h2> Lists! </h2>
          <LoginContainer/>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;