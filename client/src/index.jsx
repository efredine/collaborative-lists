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
import { Router, Route, browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk'
import lists from './components/lists.jsx'

const loggerMiddleware = createLogger();
const socket = io('http://localhost:8080');
const socketIoMiddleware = createSocketIoMiddleware(socket, ['SERVER/ADD_CARD', 'SERVER/TOGGLE_TODO', 'SERVER/MOVE'], pessimisticExecute);
const store = applyMiddleware(ReduxThunk, socketIoMiddleware, loggerMiddleware)(createStore)(reducer);

function pessimisticExecute(action, emit, next, dispatch) {
  emit('action', action);
}

render(
  <Provider store={store}>
     <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/todos" component={TodoAppContainer} />
      <Route path="/signup" component={Register} />
      <Route path="/lists" component={lists} />
    </Router>
  </Provider>,
  document.getElementById('react-root')
)