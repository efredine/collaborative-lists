import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    props.startDrag(props.id);
    return {
      id: props.id
    };
  },

  endDrag(props, monitor) {
    const didDrop = monitor.didDrop();
    props.endDrag(didDrop);
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      // props.move(overId);
    }
  }
};


class SortableCard extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    move: PropTypes.func.isRequired
  };

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        {text}
      </div>
    ));
  }
}

const dragSource = DragSource(ItemTypes.CARD, cardSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(SortableCard);

export default DropTarget(
  ItemTypes.CARD,
  cardTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  }))(dragSource);