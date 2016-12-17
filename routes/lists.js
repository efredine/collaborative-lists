"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
};

// knex.select('*')
// .from('lists')
// .then((results) => {
//   res.json(results);
// })
// .asCallback(function(err, result) {
//   if (err) {
//     return console.error("error ", err);
//   }
//   return console.log("connecting ", result);
// });
