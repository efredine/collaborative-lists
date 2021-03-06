import fetch from '../utils/fetch';
import ContentTypes from '../types/ContentTypes';
import Auth from '../utils/Auth';

function dispatchWithUserList(action) {
  return (dispatch, getState) => {
      const state = getState();
      action.userId = state.user.id;
      action.listId = state.activeList;
      dispatch(action);
  }
}

export const addChatMessage = text => dispatchWithUserList({
  type: 'SERVER/CHAT_MESSAGE',
  text
})

export const addCard = content => dispatchWithUserList({
  type: 'SERVER/ADD_CARD',
  content
});

export const addMovie = content => addCard({
  contentType: ContentTypes.MOVIE,
  ...content
});

export const addTodo = text => addCard({
  contentType: ContentTypes.TODO,
  text: text
});

export const addYelp = content => addCard({
  contentType: ContentTypes.YELP,
  ...content
});
export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleCard = (toggleId) => dispatchWithUserList({
  type: 'SERVER/TOGGLE_CARD',
  toggleId
});

export const voteCard = (voteId, vote) => dispatchWithUserList({
  type: 'SERVER/VOTE_CARD',
  voteId: voteId,
  vote
});

export const startDrag = () => ({
  type: 'START_DRAG'
});

export const toggleSortByVote = () =>({
  type: 'TOGGLE_SORT_BY_VOTE'
});

export const moveCard = (draggedId, overId) => dispatchWithUserList({
  type: 'SERVER/MOVE_CARD',
  draggedId,
  overId
});

export const endDrag = () => ({
  type: 'END_DRAG'
});

export const receiveActions = (listId, actionHistory) => ({
  type: 'RECEIVE',
  listId: listId,
  actionHistory: actionHistory
});

export const receiveList = (listId, list) => ({
  type: 'RECEIVE_LIST',
  listId: listId,
  list: list
});

const fetchActions = listId => dispatch => {
  return fetch(`/api/lists/${listId}/actions`, {})
  .then(response => response.json())
  .then(json => dispatch(receiveActions(listId, json)));
  // TODO: add error handling catch
}

// Should fetch if we don't already have it in the state
// If it is in the state, fetch it as long as it isn't already being fetched or the previous fetch returned an error.
const shouldFetch = (list) => {
  return !list || (!list.fetching && list.error);
}

const fetchList = listId => (dispatch, getState) => {
  dispatch({type: 'FETCH_LIST', listId, list:{list: null, fetching:true, error:null}});
  return fetch(`/api/lists/${listId}`, {})
  .then(response => response.json())
  .then(json => {
    if(json.length === 1) {
      return dispatch(receiveList(listId, {list: json[0], fetching:false, error:null}));
    } else {
      console.log("Invalid list:", listId);
      const error = new Error("List not found.");
      dispatch(receiveList(listId, {list: null, fetching:false, error: error}));
      return Promise.reject(error);
    }
  });
}

export const fetchActiveIfNeeded = (listId) => (dispatch, getState) => {
  const state = getState();
  const { activeList, lists } = state;
  if(listId && activeList !== listId) {
    console.log('fetch cycle for:', listId);
    const list = lists.byId[listId];
    if(shouldFetch(list)) {
      console.log('Get list then actions.');
      fetchList(listId)(dispatch, getState)
      .then(() => fetchActions(listId)(dispatch, getState));
    } else {
      console.log('Just fetch actions.');
      return fetchActions(listId)(dispatch, getState);
    }
  }
}

export const receiveUsers = (users) => ({
  type: 'RECEIVE_USERS',
  users
});

export const fetchUsers = () => dispatch => {
  return fetch(`/api/users`, {})
  .then(response => response.json())
  .then(json => dispatch(receiveUsers(json)));
}

export const receiveUser = user => ({
  type: 'RECEIVE_USER',
  user: user
});

function initializeUser(dispatch, user) {
  let actions = [ receiveUser(user) ];
  if(user.id) {
    Auth.authenticateUser(user);
  } else {
    Auth.deauthenticateUser();
  }
  return Promise.all(actions.map(dispatch));
}

export const socketEstablishedAction = dispatch => {
  const actions = [{type: 'SOCKET_ESTABLISHED'}, fetchUsers(), fetchLists()];
  return Promise.all(actions.map(dispatch));
}

export const identify = () => dispatch => {
  const user = Auth.getToken() || {username: undefined, id: undefined};
  return initializeUser(dispatch, user);
}

export const login = username => dispatch => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: `username=${username}`
    }, false)
  .then(response => response.json())
  .then(user => initializeUser(dispatch, user));
}

export const facebookLogin = accessToken => dispatch => {
    return fetch('/api/users/facebook_login', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    }, false)
  .then(response => response.json())
  .then(user => initializeUser(dispatch, user));
}

export const logout = () => (dispatch, getState) => {
  const { user } = getState();
  if(user.provider && user.provider === 1) {
    window.FB.logout(response => {
      console.log('logged out of facebook:', response);
    });
  }

  return Promise.all([
     dispatch({
        type: 'USER_LOGOUT'
      }),
     initializeUser(dispatch, {username: undefined, id: undefined})
    ]);
}

export const receiveLists = (lists) => ({
  type: 'RECEIVE_LISTS',
  lists
});

export const fetchLists = () => dispatch => {
  return fetch('/api/lists', {})
  .then(response => response.json())
  .then(json => dispatch(receiveLists(json)));
}