import { connect } from 'react-redux'
import { toggleCard, move, startDrag, endDrag } from '../actions'
import SortableList from './SortableList.jsx'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
  dragging: state.dragging
})

const mapDispatchToProps =  ({
  onTodoClick: toggleCard,
  move: move,
  startDrag: startDrag,
  endDrag: endDrag
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortableList)

export default VisibleTodoList
