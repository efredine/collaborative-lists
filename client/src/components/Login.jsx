import React, {Component} from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };

  };

  handleChangeUser = (event) => {
    this.setState({userInput: event.target.value});
  }

  handleSubmit = (event) => {
    const { login } = this.props;
    event.preventDefault();
    login(this.state.userInput);
    this.setState({userInput: ""});
  }

  handleLogout = (event) => {
    const { logout } = this.props;
    event.preventDefault();
    logout();
  }

  render() {
    const {user} = this.props;
    if(user.username) {
      return (
        <Nav pullRight>
          <Navbar.Text >
            Logged in as: {user.username } &nbsp;
          </Navbar.Text>

          <Navbar.Form pullLeft>
            <Button type="submit" className="btn-sm btn-nav" onClick={this.handleLogout}>Log Out</Button>
          </Navbar.Form>
        </Nav>
      );
    } else {
      return(
        <div>
          <form className="navbar-form" role="search">
            <div className="form-group">
                <input
                id="login"
                type="text"
                value={this.state.userInput}
                onChange={this.handleChangeUser}
                placeholder="Username"
              />
            </div>
            <button type="submit" onClick={this.handleSubmit} className="btn btn-default btn-sm">Sign In</button>
          </form>
        </div>
      );
    }
  }
}
export default Login;