import React, {Component} from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { facebookLogin } from '../actions';

class LoginPage extends Component {

  responseFacebook = (response) => {
    console.log(response);
    this.props.facebookLogin(response.accessToken);
  };

  render() {
    return(
      <FacebookLogin
        appId="1925495421029921"
        autoLoad
        buttonStyle={ { fontSize: 20 } }
        callback={this.responseFacebook}
        icon="fa-facebook"
      />
    );
  };
}

const mapDispatchToProps = ({
  facebookLogin
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginPage);