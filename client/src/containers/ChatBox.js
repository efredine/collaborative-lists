import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addChatMessage } from '../actions'

/**
 * Renders the card based on the card content type.
 */
class ChatBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    }
  }

  handleChange = event => {
    this.setState({
      userInput: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { addChatMessage } = this.props;
    let { userInput } = this.state;
    userInput.trim();
    if (userInput.length === 0) {
      return;
    }
    addChatMessage(userInput);
    this.setState({
      userInput: ""
    });
  };

  render() {
    return(
       <div>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.userInput}/>
            <button type="submit">
              Post
            </button>
          </form>
        </div>
      );
  }
}

const mapDispatchToProps =  ({
  addChatMessage: addChatMessage
})

export default connect(null, mapDispatchToProps)(ChatBox);