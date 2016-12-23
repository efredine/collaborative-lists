import React, {Component} from 'react';
import Action from './Action.jsx';
import FlipMove from 'react-flip-move';
import { animateScroll } from 'react-scroll';

class ActionList extends Component {

  componentDidUpdate() {
    animateScroll.scrollToBottom({containerId: "chat-messages"});
  }

  render() {

    const actionItems = this.props.actions.map((action) => {
      return (<Action
                key={action.id}
                {...action}
              />);
      });
    return (
      <div className="content" id="chat-messages" ref={(div) => { this.scrollDiv = div; }} >
        <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          <ul className="list-group">
            {actionItems}
          </ul>
        </FlipMove>
      </div>
    );
  }
}
export default ActionList;
