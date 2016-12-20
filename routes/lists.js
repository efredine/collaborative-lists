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
  }),

  router.get('/:listId', (req, res) => {
    const listId = req.params.listId;
    knex
    .select("*")
    .from("lists")
    .where("id", listId)
    .then((result)=>{
      if(result.length > 0){
        res.json(result);
      }else {
        console.log("resullttt", result)
      }



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

  return router;
};
