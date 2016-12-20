import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { identify } from '../actions/index'


/**
 * Renders the card based on the card content type.
 */
class AuthRequired extends Component {

  componentDidMount() {
    const {user, identify} = this.props;
    if(!user.userInitialized) {
      identify();
    }
  }

  render() {
    const {user, loading, authorized, unAuthorized} = this.props;
    console.log(user);
    let content = loading;
    if(user.userInitialized) {
      if(user.id) {
        content = authorized;
      }
      else {
        content = unAuthorized;
      }
    }
    return(
      <div>
        {content}
      </div>
      );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps =  ({
  identify: identify,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRequired);