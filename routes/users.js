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

  router.post("/login", (req, res) => {
    console.log(req.body.username);
    res.json(req.body);
  });

  return router;
};