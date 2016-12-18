import { connect } from 'react-redux'
import Login from '../components/Login.jsx'
import {login, identify, logout} from '../actions/index'

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps =  ({
  login: login,
  identify: identify,
  logout: logout
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer