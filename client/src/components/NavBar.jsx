import React, {Component} from 'react';
import { Link } from 'react-router'


class NavBar extends Component {

  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
          <h2> Lists! </h2>
          <span><Link to="/signup">Register</Link></span>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;