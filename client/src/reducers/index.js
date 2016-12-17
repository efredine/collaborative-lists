import { combineReducers } from 'redux'
import todos from './todos'
import actions from './actions'
import visibilityFilter from './visibilityFilter'
import receiver from './receiver'
import user from './user'

const sliceReducers = combineReducers({
  todos,
  actions,
  visibilityFilter,
  user
})

function reduce(state, action) {
  const intermediateState = sliceReducers(state, action);
  return receiver(intermediateState, action, sliceReducers);
}

export default reduce;
