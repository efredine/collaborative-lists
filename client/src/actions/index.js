import fetch from 'isomorphic-fetch'
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

export const moveCard = (draggedId, overId) => dispatchWithUserList({
  type: 'SERVER/MOVE_CARD',
  draggedId,
  overId
});

export const endDrag = () => ({
  type: 'END_DRAG'
});

export const receiveTodos = (listId, actionHistory) => ({
  type: 'RECEIVE',
  listId: listId,
  actionHistory: actionHistory
});

export const fetchActions = (listId) => dispatch => {
  return fetch(`/api/lists/${listId}/actions`, {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(json => dispatch(receiveTodos(listId, json)));
  // TODO: add error handling catch
}

export const receiveUsers = (users) => ({
  type: 'RECEIVE_USERS',
  users
});

export const fetchUsers = () => dispatch => {
  return fetch(`/api/users`, {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(json => dispatch(receiveUsers(json)));
}

export const receiveUser = user => ({
  type: 'RECEIVE_USER',
  user: user
});

export const identify = () => dispatch => {
  return fetch('/api/users/identify', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(json => dispatch(receiveUser(json)));
}

export const login = username => dispatch => {
  return fetch('/api/users/login', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: `username=${username}`
    })
  .then(response => response.json())
  .then(json => dispatch(receiveUser(json)));

}

export const logout = () => dispatch => {
  return fetch ('/api/users/logout', {
    credentials: 'include',
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
  return fetch('/api/lists', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(json => dispatch(receiveLists(json)));
}