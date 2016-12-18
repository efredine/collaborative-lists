"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    const userId = 1;
    knex
      .select("*")
      .from("lists")
      .innerJoin("users_lists", "lists.id", "list_id")
      .where("user_id", userId)
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/new", (req, res) => {
    //req.sessions.user.id;
    const userId = 1;
    knex('lists')
      .returning('id')
      .insert({
        title: req.body.title
      })
      .then( result => {
        const listId = result[0];
        knex('users_lists')
        .returning('id')
        .insert({
          user_id: userId,
          list_id: listId,
          created: true
        })
        .then(id => {
          res.json({listId});
        });
      });
  });

  return router;
};

