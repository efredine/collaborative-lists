/**
 * For incoming actions, look-up the referenced user and inject it into the action.
 *
 * Implemented as redux middleware.
 */
const injectUser = ({ getState, dispatch }) => next => action => {
  const state = getState();


  const isLocal = action.type.split("/").length === 1;
  if(isLocal && action.userId) {
    const { users, user, activeList } = state;
    action.actingUser = users.byId[action.userId];
    action.currentUser = user;
    action.activeList = activeList;
  }
  if(action.type === 'RECEIVE') {
    const { users, user } = state;
    action.users = users;
    action.currentUser = user;
  }
  return next(action);
};

export default injectUser;