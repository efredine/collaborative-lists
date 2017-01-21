import fetch from '../utils/fetch';
import ContentTypes from '../types/ContentTypes';

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

export const fetchActions = listId => dispatch => {
  return fetch(`/api/lists/${listId}/actions`, {})
  .then(response => response.json())
  .then(json => dispatch(receiveActions(listId, json)));
  // TODO: add error handling catch
}

export const fetchList = listId => dispatch => {
  return fetch(`/api/lists/${listId}`, {})
  .then(response => response.json())
  .then(json => {
    if(json.length === 1) {
      return dispatch(receiveList(listId, json[0]));
    } else {
      console.log("Invalid list:", listId);
      return Promise.reject(new Error("not found"));
    }
  });
}

export const fetchActiveIfNeeded = (listId) => (dispatch, getState) => {
  const { activeList, lists } = getState();
  if(listId && activeList !== listId) {
    const fetches = [];
    fetches.push(fetchActions(listId)(dispatch));
    if(!lists.byId[listId]) {
      fetches.push(fetchList(listId)(dispatch));
    }
    return Promise.all(fetches);
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

export const identify = () => dispatch => {
  return fetch('/api/users/identify', {})
  .then(response => response.json())
  .then(json => dispatch(receiveUser(json)));
}

export const login = name => dispatch => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: `name=${name}`
    })
  .then(response => response.json())
  .then(json => Promise.all([
    dispatch(receiveUser(json)),
    dispatch(identify()),
    dispatch(fetchUsers()),
    dispatch(fetchLists())
    ]
  ));
}

export const logout = () => dispatch => {
  dispatch({
    type: 'USER_LOGOUT'
  });

  return fetch ('/api/users/logout', {
    method: 'POST'
  })
  .then (response => response.json())
  .then(json => dispatch(receiveUser(json)));
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