// Performs initialization for application.
import { identify } from '../actions'
import { connect } from 'react-redux'
import React, {Component} from 'react';
import App from '../components/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class AppContainer extends Component {

  componentDidMount() {
    const { identify } = this.props;
    identify();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/(:listId)" component={App} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  user: state.user
})

const mapDispatchToProps =  ({
  identify: identify
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)