import React, { Component, PropTypes } from 'react';
import ItemTypes from '../types/DropItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';


const cardSource = {
  beginDrag(props) {
    props.startDrag();
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  canDrag(props) {
    return !props.sortByVote;
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
      props.endDrag();
    } else {
      props.broadcastMove(droppedId);
    }
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
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};

class SortableCard extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired
  };

  render() {
    const {isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{opacity }}>
        {this.props.children}
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