
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.renameColumn('name', 'username');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.renameColumn('username', 'name');
  });
};
