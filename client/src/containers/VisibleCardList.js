import { connect } from 'react-redux'
import { toggleCard, moveCard, startDrag, endDrag, voteCard } from '../actions'
import SortableList from './SortableList.jsx'

const getVisibleCards = (cards, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return cards
    case 'SHOW_COMPLETED':
      return cards.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return cards.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  cards: getVisibleCards(state.cards, state.visibilityFilter),
  dragging: state.dragging
})

const mapDispatchToProps =  ({
  onCardClick: toggleCard,
  moveCard: moveCard,
  startDrag: startDrag,
  endDrag: endDrag,
  voteCard: voteCard
})

const VisibleCardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortableList)

export default VisibleCardList
