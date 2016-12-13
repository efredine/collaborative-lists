import { combineReducers } from 'redux'
import todos from './todos'
import actions from './actions'
import visibilityFilter from './visibilityFilter'
import moves from './moves'
import drags from './drags'

const combinedReducers = combineReducers({
  todos,
  actions,
  visibilityFilter,
  drags
});

function todoApp(state, action) {
  const intermediateState = combinedReducers(state, action);
  return moves(intermediateState, action);
}

export default todoApp
