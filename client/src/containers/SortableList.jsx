import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import SortableCard from './SortableCard.jsx';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import flow from 'lodash/flow';

const style = {
  width: 400
};

const cardTarget = {
  drop() {
  }
};

class SortableList extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.state = {
      todos: props.todos
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: check if todos have changed first
    this.setState({
      todos: nextProps.todos
    })
  }

  moveCard(id, atIndex) {
    const { todo, index } = this.findCard(id);
    this.setState(update(this.state, {
      todos: {
        $splice: [
          [index, 1],
          [atIndex, 0, todo]
        ]
      }
    }));
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
    const { connectDropTarget } = this.props;
    const { onTodoClick, startDrag, endDrag } = this.props;

    const {todos} = this.state;

    return connectDropTarget(
      <div style={style}>
        {todos.map(todo => {
          return (
            <SortableCard key={todo.id}
                  id={todo.id}
                  moveCard={this.moveCard}
                  findCard={this.findCard}
                  text={todo.text}/>
              // <Todo
              //   onClick={onTodoClick}
              //   completed={todo.completed}
              //   text={todo.text}
              // />
            // </SortableCard>
          );
        })}
      </div>
    );
  }
}


const dropTarget = DropTarget( ItemTypes.CARD, cardTarget,
  (connect) =>{
    return {
      connectDropTarget: connect.dropTarget(),
    };
  })(SortableList);

export default DragDropContext(HTML5Backend)(dropTarget);