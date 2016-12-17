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
    // If this user is currently logged in, return their username.
    res.json({user: undefined});
  });

  router.post("/login", (req, res) => {
    // Look up the user name and log them in if appropriate or return an error
    console.log(req.body.username);
    res.json(req.body);
  });

  return router;
};