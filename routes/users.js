"use strict";

const express = require('express');
const router  = express.Router();
const cfg = require('../config.js');
const jwt = require("jwt-simple");

const undefinedUser = {name: undefined, id: undefined, token: undefined};

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
    // Look up the user name and log them in if appropriate or return an error
    const name = req.body.name;
    knex
      .select("id", "name")
      .from("users")
      .where("users.name", "=", name)
      .then((users) => {
        if(users && users.length === 1) {
          const user = users[0];
          if(name === user.name) {
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
