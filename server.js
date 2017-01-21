require('dotenv').config({silent: true});

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser    = require("body-parser");
const MovieDB = require('moviedb')(process.env.MOVIEDB_KEY);
const cookieSession = require('cookie-session')

const ENV         = process.env.ENV || "development";

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const Yelp        = require('yelp');
const pubsub      = require('./lib/pubsub');
const publish     = pubsub(io, knex);
const auth        = require("./lib/auth.js")();

// const yelpAuth    = require(process.env.)

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const listsRoutes = require("./routes/lists");

app.use(cookieSession({name: 'session', secret: 'secret garden'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(auth.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var yelp = new Yelp({
  consumer_key: '3fIu0xLb0HZM_B40Yqz92g',
  consumer_secret: 'CfRXxRQXS9IlkWb1DkmkbNLamhI',
  token: '3s36NPl5mObmdcpIpjLcg1Hy0jUcCi8o',
  token_secret: 'qqBdAkGPSpMiw9pdkaSRvQpHhic',
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
app.use("/api/lists", auth.authenticate(), listsRoutes(knex, publish));

app.get("/api/todos", (req, res) => {
  res.redirect("/api/lists/1/actions")
});

app.get("/api/movies/:movie", (req, res)=> {
  MovieDB.searchMovie({query: `${req.params.movie}`}, function(err, result){
    res.json(result);
  });
});

app.get("/api/popular/movies", (req, res)=> {
  MovieDB.miscPopularMovies(function(err, result){
    res.json(result);
  });
});

app.get("/api/popular/movies/topRated", (req, res)=> {
  MovieDB.miscTopRatedMovies(function(err, result){
    res.json(result);
  });
});

app.get("/api/popular/movies/nowPlaying", (req, res)=> {
  MovieDB.miscNowPlayingMovies(function(err, result){
    res.json(result);
  });
});

app.get("/api/popular/movies/upComing", (req, res)=> {
  MovieDB.miscUpcomingMovies(function(err, result){
    res.json(result);
  });
});

app.get("/api/popular/movies/discover/:movie", (req, res)=> {
  MovieDB.discoverMovie({with_genres: `${req.params.movie}`},function(err, result){
    res.json(result);
  });
});

app.get("/api/v2/search/:restaurant/:location/", (req, res)=>{
  yelp.search({ term: `${req.params.restaurant}`, location: `${req.params.location}`, limit: 30}, function(err, result){
    console.log("result", result);
    console.log("err", err)
    res.json(result);
  })
})

app.post("/api/update", (req, res) => {
  console.log(req.body.theThing);
  res.json(["Got it"]);
});

server.listen(8080);
