
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.integer('provider');
    table.string('provider_id');
    table.unique(['provider', 'provider_id']);

    table.string('display_name');
    table.string('family_name');
    table.string('given_name');
    table.string('middle_name');
    table.string('gender');
    table.string('profile_url');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumns(
      'provider',
      'provider_id',
      'display_name',
      'family_name',
      'given_name',
      'middle_name',
      'gender',
      'profile_url',
      'email'
      );
  });
};
