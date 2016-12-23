/**
 * For incoming actions, look-up the referenced user and inject it into the action.
 *
 * Implemented as redux middleware.
 */
const injectUser = ({ getState, dispatch }) => next => action => {
  if(action.userId) {
    const { users } = getState();
    action.user = users.byId[action.userId];
  }
  if(action.type === 'RECEIVE') {
    const { users } = getState();
    action.users = users;
  }
  return next(action);
};

export default injectUser;