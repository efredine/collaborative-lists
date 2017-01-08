import { combineReducers } from 'redux'

function receiveLists(state = {byId: {}, allIds: []}, action) {
  switch(action.type) {
    case "RECEIVE_LISTS":
      const byId = {};
      action.lists.forEach(list => {
        byId[list.id] = list;
      });
      const allIds = action.lists.map(list => list.id);
      const result = {byId, allIds};
      return result;
    default:
      return state;
  }
}

function updateTitle(state, action) {
  const {listId, title} = action;
  const currentListDetails = state[listId];
  if(!currentListDetails) {
    return state;
  }
  const updatedState = Object.assign({}, state);
  updatedState[listId] = Object.assign({}, currentListDetails, {title});
  return updatedState;
}

function addList(state, action) {
  const { listId } = action;
  if(state[listId]) {
    return state;
  } else {
    const updatedState = Object.assign({}, state);
    updatedState[listId] = action.list;
    return updatedState;
  }
}

function listsById(state = {}, action) {
  switch(action.type) {
    case "UPDATE_TITLE" : return updateTitle(state, action);
    case "RECEIVE_LIST" : return addList(state, action);
    default : return state;
  }
}

function addListId(state, action) {
  // add this listId if it isn't already in the array
  const { listId } = action;
  if(state.find(x => Number(x) === Number(listId)))  {
    return state;
  } else {
    return state.concat(listId);
  }
}

function allLists(state = [], action) {
  switch(action.type) {
    case "RECEIVE_LIST" : return addListId(state, action);
    default : return state;
  }
}

// Reducer for all lists
const listsSliceReducers = combineReducers({
    byId : listsById,
    allIds : allLists
});

export default function lists(state, action){
  const intermediateState = receiveLists(state, action);
  return listsSliceReducers(intermediateState, action);
};