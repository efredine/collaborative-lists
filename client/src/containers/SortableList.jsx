import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import SortableCard from './SortableCard.jsx';
import Todo from '../components/Todo';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
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

function todosDifferent(a, b) {
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
      todos: props.todos,
      lastOverId: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props');
    if(todosDifferent(this.state.todos, nextProps.todos)) {
      this.setState({
        todos: nextProps.todos
      })
    }
  }

  moveCard(id, atIndex) {
    const { todo, index } = this.findCard(id);
    const overId = this.state.todos[atIndex].id;
    this.setState(update(this.state, {
      todos: {
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
    this.props.move(droppedId, this.state.lastOverId);
  }

  findCard(id) {
    const { todos } = this.state;
    const todo = todos.filter(c => c.id === id)[0];

    return {
      todo,
      index: todos.indexOf(todo)
    };
  }

  render() {
    const { isDragging, connectDropTarget, onTodoClick, startDrag, endDrag, dragging } = this.props;

    const {todos} = this.state;

    const items = todos.map(todo => {
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
              id={todo.id}
              onClick={() => onTodoClick(todo.id)}
              text={todo.text}
              completed={todo.completed}
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