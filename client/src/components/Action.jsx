import React, {Component} from 'react'

class Action extends Component {
  componentDidAppear() {
    console.log('action appeared');
  }

  render() {
    const { user, type, text } = this.props;
    // user.id exists as well
    return (
        <li className="list-group-item small">
          <span className={"chatuser" + user.id}>
            {user ? user.name : ""}
          </span>
          {this.props.type}
          {this.props.text}
        </li>
    );
  }
}
export default Action;