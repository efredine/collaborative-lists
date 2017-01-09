import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

/**
 * Renders the card based on the card content type.
 */
class AddTodo extends Component {

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
    const { addTodo, activeList } = this.props;
    let { userInput } = this.state;
    userInput.trim();
    if (userInput.length === 0) {
      return;
    }
    addTodo(userInput);
    this.setState({
      userInput: ""
    });
  };

  render() {
    return(
        <Form inline onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input onChange={this.handleChange} value={this.state.userInput} placeholder="Text" className="form-control input-sm"/>
          </div>
          <Button type="submit" className="btn btn-sm">
            Add Todo
          </Button>
        </Form>
      );
  }
}

const mapDispatchToProps =  ({
  addTodo: addTodo
})

export default connect(null, mapDispatchToProps)(AddTodo);