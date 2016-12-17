exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists', function (table) {
    table.increments();
    table.string('title');
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lists');
};
