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

  render() {
    const { connectDropTarget } = this.props;
    const { todos, onTodoClick, move, startDrag, endDrag } = this.props;

    debugger;

    return connectDropTarget(
      <div style={style}>
        {todos.map(todo => {
          return (
            <SortableCard key={todo.id}
                  id={todo.id}
                  move={move}
                  startDrag={startDrag}
                  endDrag={endDrag}
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
  connect =>{
    debugger;
    return {
      connectDropTarget: connect.dropTarget()
    };
  })(SortableList);

export default DragDropContext(HTML5Backend)(dropTarget);