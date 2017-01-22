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
    let socket = io(socketAddress);
    let socketIoMiddleware = createSocketIoMiddleware(socket, criteria, options)( { getState, dispatch } );
    return next => action => {
      if( socket ) {
        return socketIoMiddleware(next)(action);
      } else {
        return next(action);
      }
    };
  };
}