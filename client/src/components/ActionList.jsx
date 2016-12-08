import React, {Component} from 'react';
import Action from './Action.jsx';

class ActionList extends Component {
  render() {
    const actionItems = this.props.actions.map((action) => {
      return (<Action
                key={action.id}
                {...action}
              />);
      });
    return (
      <ul className="list-unstyled">
        {actionItems}
      </ul>
    );
  }
}
export default ActionList;
