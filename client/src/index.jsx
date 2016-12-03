import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();
const socket = io('http://localhost:8080');
const socketIoMiddleware = createSocketIoMiddleware(socket, ['SERVER/ADD_TODO', 'SERVER/TOGGLE_TODO'], pessimisticExecute);
const store = applyMiddleware(socketIoMiddleware, loggerMiddleware)(createStore)(reducer);

function pessimisticExecute(action, emit, next, dispatch) {
  emit('action', action);
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)
