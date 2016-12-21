/**
 * Filter incoming notifications based on whether they are for the currently active link or for other links the user has.
 *
 * Implemented as redux middleware.
 */
const notifications = ({ getState, dispatch }) => next => action => {
  const { activeLink } = getState();
  switch (action.type) {
    case 'MOVE_CARD':
    case 'ADD_CARD':
    case 'TOGGLE_CARD':
      if(action.linkId === activeLink) {
        return next(action);
      } else {
        return;
      }
    default:
      return next(action);
  }
};

export default notifications;