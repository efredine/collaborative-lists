import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import SortableCard from './SortableCard.jsx';
import SmartCard from './SmartCard.js';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../types/DropItemTypes';
import shallowEqual from '../utils/shallowEqual'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'
import TransitionItem from './TransitionItem.jsx'
import FlipMove from 'react-flip-move';

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
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.broadcastMove = this.broadcastMove.bind(this);
    this.state = {
      cards: props.cards,
      lastOverId: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if(cardsDifferent(this.state.cards, nextProps.cards)) {
      this.setState({
        cards: nextProps.cards
      })
    }
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    const overId = this.state.cards[atIndex].id;
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
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
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  render() {
    const { isDragging, connectDropTarget, onCardClick, startDrag, endDrag, dragging, voteCard } = this.props;

    const {cards} = this.state;

    // voteId is provided here.  The actual vote is provided in the card.
    const onVote = voteId => vote => voteCard(voteId, vote);

    const items = cards.map(card => {
      return (
        <TransitionItem key={card.id}>
          <SortableCard
            key={card.id}
            id={card.id}
            startDrag={startDrag}
            endDrag={endDrag}
            moveCard={this.moveCard}
            findCard={this.findCard}
            broadcastMove={this.broadcastMove}>
            <SmartCard
              onClick={() => onCardClick(card.id)}
              votes={true}
              onVote={onVote(card.id)}
              {...card}
            />
          </SortableCard>
        </TransitionItem>
      );
    });

    return connectDropTarget(
      <div>
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