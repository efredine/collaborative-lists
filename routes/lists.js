"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    const userId = req.session.user.id;
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
    const userId = req.session.user.id;
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

  function formatActionResults(rows) {
    return rows.map(row => {
      const action = JSON.parse(row.action);
      action.id = row.id;
      action.userId = row.user_id;
      action.listId = row.list_id;
      return action
    });
  }

  router.get("/:listId/actions", (req, res) => {
    const listId = req.params.listId;
    knex('actions')
      .select('*')
      .from('actions')
      .orderBy('id')
      .where('list_id', listId)
      .then((results) => {
        console.log(results);
        res.json(formatActionResults(results));
      });
  });

  return router;
};

