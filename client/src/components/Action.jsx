import React, {Component} from 'react'

function getColorId(user) {
  return user % 7;
}

const colors = ["red","green","blue","purple","black","orange"];


class Action extends Component {
  componentDidAppear() {
    console.log('action appeared');
  }

  render() {
    const { user, type, text } = this.props;
    const SpanStyle = {
      color: "" + colors[getColorId(user.id)]
      };
    return (
        <li className="list-group-item small">
          <span style={SpanStyle} className={"" + colors[getColorId(user.id)]}>
            {user ? user.username : ""}
          </span>
          {this.props.type}
          {this.props.text}
        </li>
    );
  }
}
export default Action;