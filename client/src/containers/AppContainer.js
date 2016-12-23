// Performs initialization for application.
import { fetchUsers } from '../actions'
import { connect } from 'react-redux'
import React, {Component} from 'react';
import App from '../components/App';

class AppContainer extends Component {

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  render() {
    const { users } = this.props;
    console.log(users);
    if(users.allIds.length > 0) {
      return (<App/>);
    }
    else {
      return(
        <div>loading...</div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps =  ({
  fetchUsers: fetchUsers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)