"use strict";

const express = require('express');
const router  = express.Router();
const cfg = require('../config.js');
const jwt = require("jwt-simple");

const undefinedUser = {username: undefined, id: undefined, token: undefined};

module.exports = (knex, auth) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/login", (req, res) => {
    // Look up the user's username and log them in if appropriate or return an error
    const username = req.body.username;
    knex
      .select("id", "username")
      .from("users")
      .where("users.username", "=", username)
      .then((users) => {
        if(users && users.length === 1) {
          const user = users[0];
          if(username === user.username) {
            const payload = {
                id: user.id
            };
            user.token = jwt.encode(payload, cfg.jwtSecret);
            console.log("logged in:", user);
            return res.json(user);
          }
        }
        res.json(undefinedUser);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(undefinedUser);
      });
  });

  router.post("/logout", (req, res) => {
    res.json(undefinedUser);
  });

 return router;
};
