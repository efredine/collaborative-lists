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
      res.json({name: undefined});
    }

  });

  router.post("/login", (req, res) => {
    // Look up the user name and log them in if appropriate or return an error
    console.log("session:", req.session);
    knex
      .select("id", "name")
      .from("users")
      .where("users.name", "=", req.body.name)
      .then((user) => {
        const userRecord = user[0];
        if(req.body.name === userRecord.name) {
          req.session.user = Object.assign({}, req.body, userRecord);
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
    res.json({name: undefined});
  });

 return router;
};
