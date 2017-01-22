const socketioJwt = require('socketio-jwt');
const cfg = require("../config.js");

module.exports = (io, knex) => {
  const actionHelpers = require('./actionHelpers')(knex);

  io.set('authorization', socketioJwt.authorize({
    secret: cfg.jwtSecret,
    handshake: true
  }));

  function publish(action) {
    io.emit('action', action);
  }

  io.on('connection', function(socket){
    console.log("Socket connected: ", socket.id);
    socket.on('action', (action) => {
      console.log('INCOMING ACTION:');
      console.log(action.type);
      // Actions are of the form SERVER/<ACTION>.  The SERVER portion of this is stripped
      // before broadcasting to all the clients.
      action.type = action.type.split('/')[1];
      const listId = action.listId || 1;
      const userId = action.userId || 1;
      console.log("ids", listId, userId);
      actionHelpers.insert(listId, userId, action)
      .then(id => {
        action.id = id;
        console.log('BROADCAST ACTION');
        console.log(action.type);
        publish(action);
      });
    })
    .on('disconnect', () => console.log('disconnected', socket.id));
  });

  // returns a function that allows an action to be published
  return publish;
};