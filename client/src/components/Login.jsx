import React, {Component} from 'react';

class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      value: "",
      userInput: ""
    };



    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);

  };


   handleSubmitText(event) {
    if (event.key === "Enter") {
      this.props.sendMessage(event.target.value, this.state.user);
    }
  }

  handleChangeText(event) {
     console.log(event.target.value)
     this.setState({value: event.target.value});
    }

    handleChangeUser(event) {
    console.log(event.target.value)
    this.setState({userInput: event.target.value});

    }


  render() {
    return(
<div>
  <form className="navbar-form navbar-right" role="search">
    <div className="form-group">
        <input
        id="login"
        type="text"
        value={this.state.userInput}
        onKeyPress={this.handleSubmitUser}
        onChange={this.handleChangeUser}
        placeholder="Username"
      />
    </div>
    <button type="submit" className="btn btn-default">Sign In</button>
  </form>
</div>
    );
  }
}
export default Login;