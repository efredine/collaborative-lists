"use strict";

const express = require('express');
const router  = express.Router();

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
      res.json({username: undefined});
    }
    //If this user is currently logged in, return their username.
    // knex
    //   .select("name")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    //   });
  });

  router.post("/login", (req, res) => {
    // Look up the user name and log them in if appropriate or return an error
    console.log("session:", req.session);
    knex
      .select("id", "name")
      .from("users")
      .where("users.name", "=", req.body.username)
      .then((user) => {
        if(req.body.username === user[0].name) {
          req.session.user = req.body;
        }else {
          req.session.user = null;
        }
        console.log(req.session);
        res.json(req.body);
      })
      .catch((error) => {
        console.error("Username does not exist");
      });
  });

  router.post("/logout", (req, res) => {
    req.session.user = null;
    res.json({username: undefined});
  });

 return router;
};
