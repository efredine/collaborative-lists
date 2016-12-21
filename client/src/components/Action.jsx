import React, {Component} from 'react'

class Action extends Component {
  componentDidAppear() {
    console.log('action appeared');
  }

  render() {
    return (
        <li className="list-group-item small">
          {this.props.type} {this.props.text}
        </li>
    );
  }
}
export default Action;