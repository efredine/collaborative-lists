"use strict";

module.exports = (knex) => {

  const helpers = {};

  helpers.insert = (listId, userId, action) => {
    return knex('actions')
    .returning('id')
    .insert({
      list_id: listId,
      user_id: userId,
      action: JSON.stringify(action)
    })
    .then(ids => ids[0]);
  };

  return helpers;
};