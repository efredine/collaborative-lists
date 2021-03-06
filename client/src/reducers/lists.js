import { combineReducers } from 'redux'

function receiveLists(state = {byId: {}, allIds: []}, action) {
  switch(action.type) {
    case "RECEIVE_LISTS":
      const nextState = action.lists.reduce((state, list) =>{
        const instanceAction = {
          type: 'RECEIVE_LIST',
          listId: list.id,
          list: {
            list: list,
            fetching: false,
            error: null,
          }
        };
        return listsSliceReducers(state, instanceAction);
      }, state);
      return nextState;
    default:
      return state;
  }
}

function updateListDetails(listToUpdate, updatedFields) {
  const list = Object.assign({}, listToUpdate.list, updatedFields);
  return Object.assign({}, listToUpdate, { list });
}

function updateTitle(state, action) {
  const {listId, title} = action;
  const listToUpdate = state[listId];
  if(!listToUpdate) {
    return state;
  }
  const updatedState = Object.assign({}, state);
  updatedState[listId] = updateListDetails(listToUpdate, { title });
  return updatedState;
}

function addList(state, action) {
  const { listId, list } = action;
  const updatedState = Object.assign({}, state);
  updatedState[listId] = list;
  return updatedState;
}

function listsById(state = {}, action) {
  switch(action.type) {
    case "UPDATE_TITLE" : return updateTitle(state, action);
    case "RECEIVE_LIST" : return addList(state, action);
    case "FETCH_LIST"   : return addList(state, action);
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