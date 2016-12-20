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

export const addCard = (listId, content) => dispatchWithUserList({
  type: 'SERVER/ADD_CARD',
  listId,
  content
});

export const addTodo = (listId, text) => (addCard(listId, {
  contentType: ContentTypes.TODO,
  text: text
}))

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleCard = (toggleId) => dispatchWithUserList({
  type: 'SERVER/TOGGLE_CARD',
  toggleId
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

export const fetchTodos = (listId) => dispatch => {
  return fetch(`/api/lists/${listId}/actions`, {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(json => dispatch(receiveTodos(listId, json)));
  // TODO: add error handling catch
}

export const receiveUser = user => ({
  type: 'RECEIVE_USER',
  user: user
});

export const identify = () => dispatch => {
  return fetch('/api/users/identify', {
    credentials:
    'include'
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