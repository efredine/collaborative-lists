require("../styles/application.scss");
import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import TodoAppContainer from './containers/TodoAppContainer.jsx'
import Register from './components/Register.jsx';
import reducer from './reducers'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import createLogger from 'redux-logger';
import notifications from './middleware/notifications';
import ReduxThunk from 'redux-thunk';


const loggerMiddleware = createLogger();
const socket = io('http://localhost:8080');
const socketIoMiddleware = createSocketIoMiddleware(socket, ['SERVER/ADD_CARD', 'SERVER/TOGGLE_CARD', 'SERVER/MOVE_CARD'], pessimisticExecute);
const store = applyMiddleware(ReduxThunk, socketIoMiddleware, notifications, loggerMiddleware)(createStore)(reducer);

function pessimisticExecute(action, emit, next, dispatch) {
  emit('action', action);
}

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('react-root')
)
