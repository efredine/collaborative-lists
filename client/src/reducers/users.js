import { combineReducers } from 'redux'

function receiveUsers(state = {byId: {}, allIds: []}, action) {
  switch(action.type) {
    case "RECEIVE_USERS":
      const byId = {};
      action.users.forEach(user => {
        byId[user.id] = user;
      });
      const allIds = action.users.map(user => user.id);
      const result = {byId, allIds};
      return result;
    default:
      return state;
  }
}

function addUserEntry(state, action) {
  const {userId, name} = action;
  return Object.assign(
    {},
    state,
    {
      userId,
      name
    });
}

function usersById(state = {}, action) {
  switch(action.type) {
    case "JOIN_LIST" : return addUserEntry(state, action);
    default : return state;
  }
}

function addUserId(state, action) {
  // add this userId if it isn't already in the array
  const { userId } = action;
  if(state.find(userId))  {
    return state.concat(action.userId);
  } else {
    return state;
  }
}

function allUsers(state = [], action) {
  switch(action.type) {
    case "JOIN_LIST" : return addUserId(state, action);
    default : return state;
  }
}

// Reducer for all users
const usersSliceReducers = combineReducers({
    byId : usersById,
    allIds : allUsers
});

export default function users(state, action){
  const intermediateState = receiveUsers(state, action);
  return usersSliceReducers(intermediateState, action);
};