/*
** Originally from: https://github.com/ezekielchentnik/redux-history
 */

const UPDATE_LOCATION = '@@history/UPDATE_LOCATION';

const initialState = {
    pathname: null,
    search: null,
    hash: null,
    state: null,
    action: null,
    key: null
};

export function location(state = initialState, action) {

  if (action.type === UPDATE_LOCATION) {
    return Object.assign({}, state, action.payload)
  }
  return state;

}

function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    payload: location
  }
}

export function connectHistory(history, store) {
  store.dispatch(updateLocation(history.location));
  const unsubscribeHistory = history.listen((nextLocation) => {
    store.dispatch(updateLocation(nextLocation));
  });

  return function unconnectHistory() {
    unsubscribeHistory();
  };

}