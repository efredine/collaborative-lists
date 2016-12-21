import React, {Component} from 'react';
import Action from './Action.jsx';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'

class ActionList extends Component {
  render() {
    const actionItems = this.props.actions.map((action) => {
      return (<Action
                key={action.id}
                {...action}
              />);
      });
    return (
      <ul className="list-group">
        <ReactTransitionGroup>
            {actionItems}
        </ReactTransitionGroup>
      </ul>
    );
  }
}
export default ActionList;
