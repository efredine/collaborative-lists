import React, {Component} from 'react';

class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };

    // this.handleChangeText = this.handleChangeText.bind(this);
    // this.handleSubmitText = this.handleSubmitText.bind(this);
    // this.handleChangeUser = this.handleChangeUser.bind(this);

  };


  // handleSubmitText(event) {
  //   if (event.key === "Enter") {
  //     console.log("enter");
  //     this.props.sendMessage(event.target.value, this.state.user);
  //   }
  // }

  // handleChangeText(event) {
  //   console.log(event.target.value)
  //   this.setState({value: event.target.value});
  // }

  handleChangeUser = (event) => {
    console.log(event.target.value)
    this.setState({userInput: event.target.value});
  }

  handleSubmit = (event) => {
    const { login } = this.props;
    event.preventDefault();
    console.log('submit now');
    login(this.state.userInput);
  }

  render() {
    const {user} = this.props;
    console.log(user);

    return(
      <div>
        <form className="navbar-form navbar-right" role="search">
          <div>Username: {user ? user.username : undefined}</div>
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
export default Login;