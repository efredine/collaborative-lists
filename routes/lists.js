"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, publish) => {

  const actionHelpers = require('../lib/actionHelpers')(knex);

  router.get("/", (req, res) => {
    const userId = req.session.user.id;
    console.log(userId);
    knex
      .select('list_id as id', 'title', 'created', 'created_at', 'updated_at')
      .from("lists")
      .innerJoin("users_lists", "lists.id", "list_id")
      .where("user_id", userId)
      .orderBy('list_id')
      .then((results) => {
        res.json(results);
      });
  });

  const addUserToListAction = (userId, listId) =>  ({
    type: 'ADD_USER_TO_LIST',
    userId: userId,
    listId: listId
  });

  const updateTitleAction = (userId, listId, title) =>  ({
    type: 'UPDATE_TITLE',
    userId: userId,
    listId: listId,
    title
  });

  function insertAndPublish(userId, listId, action) {
    actionHelpers.insert(listId, userId, action)
    .then(id => {
      action.id = id;
      console.log('BROADCAST ACTION');
      console.log(action);
      publish(action);
    });
  }

  // If a user isn't already a member of this list, add them to it.
  // TODO: put this in a transaction so the user can never get added twice
  function addUserToList(userId, listId) {
    knex
    .select('id')
    .from('users_lists')
    .where('list_id', listId)
    .andWhere('user_id', userId)
    .then( idList => {
      if(idList.length === 0 ) {
        console.log("adding user to list");
        knex('users_lists')
        .returning('id')
        .insert({
          user_id: userId,
          list_id: listId,
          created: false
        })
        .then(id => {
          insertAndPublish(userId, listId, addUserToListAction(userId, listId));
          return id;
        });
      } else {
        return idList[0];
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    })
  }

  router.get('/:listId', (req, res) => {
    const userId = req.session.user.id;
    const listId = req.params.listId;
    addUserToList(userId, listId);
    knex
    .select("*")
    .from("lists")
    .where("id", listId)
    .then((result)=>{
      res.json(result);
    })
  });

  router.post("/update", (req, res)=>{
    const userId = req.session.user.id;
    const listId = req.body.id;
    const title = req.body.title;
    knex('lists').where("id",listId)
    .update({
      title: title
    })
    .then ((result)=> {
      insertAndPublish(userId, listId, updateTitleAction(userId, listId, title));
      res.json(result)
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
