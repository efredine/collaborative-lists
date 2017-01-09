/**
 * Filter incoming notifications based on whether they are for the currently active list or for other lists the user has.
 *
 * Implemented as redux middleware.
 */
const notifications = ({ getState, dispatch }) => next => action => {
  const { activeList } = getState();
  switch (action.type) {
    case 'MOVE_CARD':
    case 'ADD_CARD':
    case 'TOGGLE_CARD':
    case 'VOTE_CARD':
      if(action.listId === activeList) {
        return next(action);
      } else {
        return;
      }
    default:
      return next(action);
  }
};

export default notifications;