require('dotenv').config({silent: true});

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser    = require("body-parser");
const MovieDB = require('moviedb')(process.env.MOVIEDB_KEY);

const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

let nextTodoId = 0;
const actionHistory = [];

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Mount all resource routes
// Mount routes on /api
//
app.use("/api/users", usersRoutes(knex));
app.use("/api/lists", usersRoutes(knex));

app.get("/api/todos", (req, res) => {
  res.json(actionHistory);
});

app.get("/api/movies/:movie", (req, res)=> {
  MovieDB.searchMovie({query: `${req.params.movie}`}, function(err, result){
    res.json(result);
  });
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
