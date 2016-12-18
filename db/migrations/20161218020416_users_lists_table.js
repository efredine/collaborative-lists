
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_lists', function(table){
    table.increments('id');
    table.integer('user_id').references('id').inTable('users');
    table.integer('list_id').references('id').inTable('lists');
    table.boolean('created').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_lists');
};
