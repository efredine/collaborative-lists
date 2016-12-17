import { connect } from 'react-redux'
import Login from '../components/Login.jsx'
import {login, identify} from '../actions/index'

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps =  ({
  login: login,
  identify: identify
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer