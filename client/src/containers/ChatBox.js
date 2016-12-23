import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addChatMessage } from '../actions'
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap';

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

<form onSubmit={this.handleSubmit}>
  <FormGroup>
    <InputGroup>
      <FormControl type="text" onChange={this.handleChange} value={this.state.userInput} placeholder="Send Message..."/>
    </InputGroup>
   </FormGroup>
</form>





      );
  }
}

const mapDispatchToProps =  ({
  addChatMessage: addChatMessage
})

export default connect(null, mapDispatchToProps)(ChatBox);

<form>
  <FormGroup>
    <InputGroup>
      <InputGroup.Button>
        <Button>Before</Button>
      </InputGroup.Button>
      <FormControl type="text" />
    </InputGroup>
   </FormGroup>
</form>