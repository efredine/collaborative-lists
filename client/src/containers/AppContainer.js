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
    return(
      <App/>
    );
  }
}

// const mapStateToProps = (state) => ({
//   cards: getVisibleCards(state.cards, state.visibilityFilter),
//   dragging: state.dragging
// })

const mapDispatchToProps =  ({
  fetchUsers: fetchUsers
});

export default connect(
  null,
  mapDispatchToProps
)(AppContainer)