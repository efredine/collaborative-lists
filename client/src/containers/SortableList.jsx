import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import SortableCard from './SortableCard.jsx';
import Todo from '../components/Todo';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../types/DropItemTypes';
import shallowEqual from '../utils/shallowEqual'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'
import TransitionItem from './TransitionItem.jsx'
import FlipMove from 'react-flip-move';

const style = {
  width: 400
};

const cardTarget = {
  drop() {
  }
};

function cardsDifferent(a, b) {
  if (a.length === b. length) {
    return !a.every((t, index) => {
      shallowEqual(t, b[index]);
    })
  }
  return true;
}

class SortableList extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);
    console.log('constructor');
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.broadcastMove = this.broadcastMove.bind(this);
    this.state = {
      cards: props.cards,
      lastOverId: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props');
    if(cardsDifferent(this.state.cards, nextProps.cards)) {
      this.setState({
        cards: nextProps.cards
      })
    }
  }

  moveCard(id, atIndex) {
    const { todo, index } = this.findCard(id);
    const overId = this.state.cards[atIndex].id;
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, todo]
        ]
      },
      lastOverId: {
        $set: overId
      }
    }));
  }

  broadcastMove(droppedId) {
    this.props.moveCard(droppedId, this.state.lastOverId);
  }

  findCard(id) {
    const { cards } = this.state;
    const todo = cards.filter(c => c.id === id)[0];

    return {
      todo,
      index: cards.indexOf(todo)
    };
  }

  render() {
    const { isDragging, connectDropTarget, onCardClick, startDrag, endDrag, dragging } = this.props;

    const {cards} = this.state;

    const items = cards.map(todo => {
      return (
        <TransitionItem key={todo.id}>
          <SortableCard
            key={todo.id}
            id={todo.id}
            startDrag={startDrag}
            endDrag={endDrag}
            moveCard={this.moveCard}
            findCard={this.findCard}
            broadcastMove={this.broadcastMove}>
            <Todo
              onClick={() => onCardClick(todo.id)}
              {...todo}
            />
          </SortableCard>
        </TransitionItem>
      );
    });

    console.log('rendering');
    return connectDropTarget(
      <div style={style}>
        <h1>Hello</h1>
        <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)" disableAllAnimations={dragging}>
          {items}
        </FlipMove>
      </div>
    );
  }
}


const dropTarget = DropTarget( ItemTypes.CARD, cardTarget,
  (connect) =>{
    return {
      connectDropTarget: connect.dropTarget()
    };
  })(SortableList);

export default DragDropContext(HTML5Backend)(dropTarget);