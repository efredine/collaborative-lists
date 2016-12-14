import React, {Component} from 'react'

class TransitionItem extends Component {
  componentDidAppear() {
    console.log('transition item appeared');
  }

  componentDidEnter() {
    console.log('transition item entered');
  }

  componentDidLeave() {
    console.log('transition item left');
  }

  render() {
    return (
        <div>
          {this.props.children}
        </div>
    );
  }
}
export default TransitionItem;