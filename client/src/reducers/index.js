import { combineReducers } from 'redux'
import cards from './cards'
import actions from './actions'
import visibilityFilter from './visibilityFilter'
import dragging from './dragging'
import receiver from './receiver'
import user from './user'

const sliceReducers = combineReducers({
  cards,
  actions,
  visibilityFilter,
  dragging,
  user
})

function reduce(state, action) {
  const intermediateState = sliceReducers(state, action);
  return receiver(intermediateState, action, sliceReducers);
}

export default reduce;
