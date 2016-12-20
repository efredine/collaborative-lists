"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.get("/", (req, res) => {
    const userId = req.session.user.id;
    knex
      .select('list_id as id', 'title', 'created', 'created_at', 'updated_at')
      .from("lists")
      .innerJoin("users_lists", "lists.id", "list_id")
      .where("user_id", userId)
      .orderBy('list_id')
      .then((results) => {
        res.json(results);
      });
  }),

  router.get('/:listId', (req, res) => {
    const listId = req.params.listId;
    knex
    .select("*")
    .from("lists")
    .where("id", listId)
    .then((result)=>{
      res.json(result);
    })
  });

  router.post("/update", (req, res)=>{
    knex('lists').where("id",req.body.id)
    .update({
      title: req.body.title
    })
    .then ((result)=> {
      console.log("hello");
      // res.json(result)
    })
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
