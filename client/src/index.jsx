import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import createLogger from 'redux-logger';
import fetch from 'isomorphic-fetch'
import { Router, Route, browserHistory } from 'react-router';

const loggerMiddleware = createLogger();
const socket = io('http://localhost:8080');
const socketIoMiddleware = createSocketIoMiddleware(socket, ['SERVER/ADD_TODO', 'SERVER/TOGGLE_TODO'], pessimisticExecute);
const store = applyMiddleware(socketIoMiddleware, loggerMiddleware)(createStore)(reducer);


function pessimisticExecute(action, emit, next, dispatch) {
  emit('action', action);
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

fetch('http://localhost:8080/api/list')
.then(function(response) {
  return response.text();
})
.then(function(responseText) {
  JSON.parse(responseText).forEach(action => {
    store.dispatch(action);
  })
  render(
    <Root store={store}/>,
    document.getElementById('react-root')
  )
})
.catch(error => {
  console.log(error);
  document.getElementById('react-root').appendChild(document.createTextNode("Error: can't connect to server."));
});

