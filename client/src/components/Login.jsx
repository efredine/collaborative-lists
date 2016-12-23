import React, {Component} from 'react';

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
        <div className="navbar-text navbar-right"><span>Logged in as: {user.username } &nbsp;</span>
        <button type="submit" onClick={this.handleLogout} className="btn btn-nav">Log Out</button>
        </div>
      );
    } else {
      return(
        <div>
          <form className="navbar-form navbar-right" role="search">
            <div className="form-group">
                <input
                id="login"
                type="text"
                value={this.state.userInput}
                onChange={this.handleChangeUser}
                placeholder="Username"
              />
            </div>
            <button type="submit" onClick={this.handleSubmit} className="btn btn-default">Sign In</button>
          </form>
        </div>
      );
    }
  }
}
export default Login;