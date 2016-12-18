import { connect } from 'react-redux'
import { toggleCard, moveCard, startDrag, endDrag } from '../actions'
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
  onTodoClick: toggleCard,
  moveCard: moveCard,
  startDrag: startDrag,
  endDrag: endDrag
})

const VisibleCardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortableList)

export default VisibleCardList
