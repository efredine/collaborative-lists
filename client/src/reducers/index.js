import { combineReducers } from 'redux'
import todos from './todos'
import actions from './actions'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  actions,
  visibilityFilter
})

export default todoApp