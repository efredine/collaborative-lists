import { combineReducers } from 'redux'
import cards from './cards'
import actions from './actions'
import visibilityFilter from './visibilityFilter'
import dragging from './dragging'
import receiver from './receiver'
import user from './user'
import users from './users'
import activeList from './activeList'
import lists from './lists'
import sortByVote from './sortByVote'

const sliceReducers = combineReducers({
  cards,
  actions,
  visibilityFilter,
  dragging,
  user,
  users,
  activeList,
  lists,
  sortByVote
});

const cardReducers = combineReducers({
  cards,
  actions,
  visibilityFilter,
});

function reduce(state, action) {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  const intermediateState = receiver(state, action, cardReducers);
  return sliceReducers(intermediateState, action);
}

export default reduce;
