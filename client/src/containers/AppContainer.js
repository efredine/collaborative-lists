// Performs initialization for application.
import { identify } from '../actions'
import { connect } from 'react-redux'
import React, {Component} from 'react';
import App from '../components/App';

class AppContainer extends Component {

  componentDidMount() {
    const { identify } = this.props;
    identify();
  }

  render() {
    const { history, listId } = this.props;
    return (
      <App history={history} listId={listId}/>
    );
  }
}

function listIdFromLocation(location){
  return location.pathname.split('/')[1];
}

const mapStateToProps = (state) => ({
  users: state.users,
  user: state.user,
  listId: listIdFromLocation(state.location)
})

const mapDispatchToProps =  ({
  identify: identify
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)