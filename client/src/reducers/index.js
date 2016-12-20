import { combineReducers } from 'redux'
import cards from './cards'
import actions from './actions'
import visibilityFilter from './visibilityFilter'
import dragging from './dragging'
import receiver from './receiver'
import user from './user'
import activeList from './activeList'

const sliceReducers = combineReducers({
  cards,
  actions,
  visibilityFilter,
  dragging,
  user,
  activeList
});

const cardReducers = combineReducers({
  cards,
  actions,
  visibilityFilter,
});

function reduce(state, action) {
  const intermediateState = receiver(state, action, cardReducers);
  return sliceReducers(intermediateState, action);
}

export default reduce;
