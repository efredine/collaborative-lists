const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser    = require("body-parser");

let nextTodoId = 0;
const actionHistory = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/list", (req, res) => {
  res.json(actionHistory);
});

app.post("/api/update", (req, res) => {
  console.log(req.body.theThing);
  res.json(["Got it"]);
});

server.listen(8080);

io.on('connection', function(socket){
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    console.log(action);
    switch(action.type) {
    case'SERVER/ADD_TODO':
      action.type = 'ADD_TODO';
      action.id = nextTodoId++;
      break;
    case 'SERVER/TOGGLE_TODO':
      action.type = 'TOGGLE_TODO';
      action.toggleId = nextTodoId++;
      break;
    case 'SERVER/MOVE':
      action.type = 'MOVE';
      action.id = nextTodoId++;
      break;
    default:
      break;
    }
    console.log(action);
    actionHistory.push(action);
    io.emit('action', action);
  });

});
