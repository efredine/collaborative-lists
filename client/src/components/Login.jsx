import React, {Component} from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, FormGroup, FormControl } from 'react-bootstrap';

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
          <Navbar.Form pullRight>
            <FormGroup>
              <span> Logged in as: {user.username } &nbsp;</span>
              <Button type="submit" className="btn-sm btn-nav" onClick={this.handleLogout}>Log Out</Button>
            </FormGroup>
          </Navbar.Form>
      );
    } else {
      return(
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl
                id="login"
                type="text"
                placeholder="Username"
                value={this.state.userInput}
                onChange={this.handleChangeUser}
              />
              {' '}
              <Button type="submit" onClick={this.handleSubmit}>Sign In</Button>
            </FormGroup>
          </Navbar.Form>
      );
    }
  }
}
export default Login;