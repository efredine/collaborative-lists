
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', function(table){
    table.increments('id');
    table.integer('user_id').references('id').inTable('users');
    table.integer('list_id').references('id').inTable('lists');
    table.text('action').nullable().defaultTo(null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('actions');
};
