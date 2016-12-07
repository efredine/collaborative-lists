import React, {Component} from 'react'

class Action extends Component {
  render() {
    return (
        <li>
          {this.props.type} {this.props.text}
        </li>
    );
  }
}
export default Action;