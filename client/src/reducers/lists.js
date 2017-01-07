import { combineReducers } from 'redux'

// function receiveLists(state = {byId: {}, allIds: []}, action) {
function receiveLists(state = [], action) {

  switch(action.type) {
    case "RECEIVE_LISTS":
      return action.lists;
      // const byId = {};
      // action.lists.forEach(list => {
      //   byId[list.id] = list;
      // });
      // const allIds = action.users.map(list => list.id);
      // const result = {byId, allIds};
      // return result;
    default:
      return state;
  }
}

// function addUserEntry(state, action) {
//   const {userId, username} = action;
//   return Object.assign(
//     {},
//     state,
//     {
//       userId,
//       username
//     });
// }

// function usersById(state = {}, action) {
//   switch(action.type) {
//     case "JOIN_LIST" : return addUserEntry(state, action);
//     default : return state;
//   }
// }

// function addUserId(state, action) {
//   // add this userId if it isn't already in the array
//   const { userId } = action;
//   if(state.find(userId))  {
//     return state.concat(action.userId);
//   } else {
//     return state;
//   }
// }

// function allUsers(state = [], action) {
//   switch(action.type) {
//     case "JOIN_LIST" : return addUserId(state, action);
//     default : return state;
//   }
// }

// // Reducer for all users
// const usersSliceReducers = combineReducers({
//     byId : usersById,
//     allIds : allUsers
// });

export default function lists(state, action){
  return receiveLists(state, action);
  // const intermediateState = receiveUsers(state, action);
  // return usersSliceReducers(intermediateState, action);
};