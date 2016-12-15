import { combineReducers } from 'redux'
import todos from './todos'
import actions from './actions'
import visibilityFilter from './visibilityFilter'
import dragging from './dragging'

const todoApp = combineReducers({
  todos,
  actions,
  visibilityFilter,
  dragging
})

export default todoApp