// Performs initialization for application.
import { fetchLists, fetchUsers, identify } from '../actions'
import { connect } from 'react-redux'
import React, {Component} from 'react';
import App from '../components/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class AppContainer extends Component {

  componentDidMount() {
    const { fetchLists, fetchUsers, identify } = this.props;
    fetchUsers();
    identify();
    // TODO: review seqquencing of list fetching - should only be done after identification is completed?
    fetchLists();
  }

  render() {
    const { users, user } = this.props;
    if(users.allIds.length > 0 && user.userInitialized) {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={App} />
          <Route path="/:listId" component={App} />
        </Router>
      );
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
  fetchLists: fetchLists,
  fetchUsers: fetchUsers,
  identify: identify
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)