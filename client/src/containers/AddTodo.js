import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

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
    addTodo(activeList, userInput);
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
              Add Todo
            </button>
          </form>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  activeList: state.activeList
})

const mapDispatchToProps =  ({
  addTodo: addTodo
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);