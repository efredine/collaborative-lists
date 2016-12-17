import fetch from 'isomorphic-fetch'


export const addTodo = (text) => ({
  type: 'SERVER/ADD_TODO',
  text
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = (id) => {
  return {
    type: 'SERVER/TOGGLE_TODO',
    id
  };
}

// export const startDrag = (id) => ({
//   type: 'START_DRAG',
//   id
// });

export const move = (draggedId, overId) => ({
  type: 'SERVER/MOVE',
  draggedId,
  overId
});

// export const endDrag = (didDrop) => ({
//   type: 'END_DRAG',
//   didDrop
// });

export const receiveTodos = actionHistory => ({
  type: 'RECEIVE',
  actionHistory: actionHistory
});

export const fetchTodos = () => dispatch => {
  return fetch('http://localhost:8080/api/todos')
  .then(response => response.json())
  .then(json => dispatch(receiveTodos(json)));
  // TODO: add error handling catch
}

export const receiveUser = user => ({
  type: 'RECEIVE_USER',
  user: user
});

export const identify = () => dispatch => {
  return fetch('http://localhost:8080/api/users/identify')
    .then(response => response.json())
    .then(json => dispatch(receiveUser(json)));
}

export const login = username => dispatch => {
  return fetch('http://localhost:8080/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: `username=${username}`
    })
  .then(response => response.json())
  .then(json => dispatch(receiveUser(json)));
}
