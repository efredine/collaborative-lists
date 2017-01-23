/**
* Higher-order function that wraps this one:
* https://github.com/itaylor/redux-socket.io
*
* This middleware creates an authenticated socket.  Once the socket is created, it creates the redux-socket middleware
* and delegates middleware processing to it.
*
* If the user logs out or is not authenticated, the socket is closed.
*
* While there is no active socket, this middleware just acts as a pass-through.
*/
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

export default function createAuthenticatedSocketIoMiddleware(socketAddress, criteria, options) {
  return ({ getState, dispatch }) => {
    let socketEstablished = false;
    let socket = null;
    let socketIoMiddleware = null;
    return next => action => {
      switch(action.type) {
        case 'RECEIVE_USER':
          if(action.user.token) {
            socket = io(socketAddress, {
              forceNew: true,
              query: 'token=' + action.user.token
            });
            socket
            .on('connecting', () => console.log('connecting'))
            .on('disconnect', () => console.log('socket disconnected'))
            .on('event', () => console.log('event'))
            .on('unauthorized', () => console.log('socket unauthorized'))
            .on('connect_error', () => console.log('connect_error'))
            .on('error', (error) => console.log('socket error', error))
            .on('connect', () => {
              socketEstablished = true;
              socketIoMiddleware = createSocketIoMiddleware(socket, criteria, options)( { getState, dispatch } );
              dispatch({type: 'SOCKET_ESTABLISHED'});
            });
          }
          return next(action);
        case 'USER_LOGOUT':
          socketEstablished = false;
          socket.close();
          socket = null;
          socketIoMiddleware = null;
          return next(action);
        default:
          if( socketEstablished ) {
            return socketIoMiddleware(next)(action);
          } else {
            return next(action);
          }
      }
    };
  };
}