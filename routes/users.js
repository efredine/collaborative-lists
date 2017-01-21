"use strict";

const express = require('express');
const router  = express.Router();

const undefinedUser = {name: undefined, id: undefined};

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/identify", (req, res) => {
    console.log("session:", req.session);

    if(req.session.user) {
      res.json(req.session.user);
    } else {
      res.json({name: undefined});
    }

  });

  router.post("/login", (req, res) => {
    // Look up the user name and log them in if appropriate or return an error
    console.log("session:", req.session);
    const name = req.body.name;
    knex
      .select("id", "name")
      .from("users")
      .where("users.name", "=", name)
      .then((users) => {
        if(users && users.length === 1) {
          const user = users[0];
          if(name === user.name) {
            req.session.user = user;
            console.log("logged in:", req.session);
            return res.json(user);
          }
        }
        req.session.user = null;
        console.log("user not found:", req.session);
        res.json(undefinedUser);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(undefinedUser);
      });
  });

  router.post("/logout", (req, res) => {
    req.session.user = null;
    res.json(undefinedUser);
  });

 return router;
};
