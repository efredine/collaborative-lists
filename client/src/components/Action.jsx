import React, {Component} from 'react'

class Action extends Component {
  render() {
    return (
        <li>
          {this.props.type} {this.props.id}
        </li>
    );
  }
}
export default Action;