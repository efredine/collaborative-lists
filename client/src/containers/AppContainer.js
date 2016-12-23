// Performs initialization for application.
import { fetchUsers, identify } from '../actions'
import { connect } from 'react-redux'
import React, {Component} from 'react';
import App from '../components/App';

class AppContainer extends Component {

  componentDidMount() {
    const { fetchUsers, identify } = this.props;
    fetchUsers();
    identify();
  }

  render() {
    const { users, user } = this.props;
    console.log(users);
    if(users.allIds.length > 0 && user.userInitialized) {
      return (<App/>);
    }
    else {
      return(
        <div></div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  user: state.user
})

const mapDispatchToProps =  ({
  fetchUsers: fetchUsers,
  identify: identify
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)