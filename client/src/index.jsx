require("../styles/application.scss");
import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './containers/AppContainer'
import Register from './components/Register.jsx';
import reducer from './reducers'
import createLogger from 'redux-logger';
import notifications from './middleware/notifications';
import injectUser from './middleware/injectUser';
import createAuthenticatedSocketIoMiddleware from './middleware/socket';
import ReduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { connectHistory } from './utils/redux-history';

function pessimisticExecute(action, emit, next, dispatch) {
  emit('action', action);
}

// If running on port 3000 connect to 8080 instead because we're in dev mode.  Otherwise, connect to origin.
function getSocketAddress(){
  if(location.port === '3000') {
    const host = location.host.split(':')[0];
    return 'http://'+host+':8080';
  } else {
    return location.origin;
  }
}

const loggerMiddleware = createLogger();
const socketAddress = getSocketAddress();
console.log(location, socketAddress);

const socketIoMiddleware = createAuthenticatedSocketIoMiddleware(
  socketAddress,
  ['SERVER/ADD_CARD', 'SERVER/TOGGLE_CARD', 'SERVER/MOVE_CARD', 'SERVER/VOTE_CARD', 'SERVER/CHAT_MESSAGE'],
  {execute: pessimisticExecute}
);
const store = applyMiddleware(ReduxThunk, notifications, injectUser, socketIoMiddleware, loggerMiddleware)(createStore)(reducer);
const history = createHistory();
const unconnectHistory = connectHistory(history, store);

render(
  <Provider store={store}>
    <AppContainer history={history}/>
  </Provider>,
  document.getElementById('react-root')
)
