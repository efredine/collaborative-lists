exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice'}),
        knex('users').insert({name: 'Bob'}),
        knex('users').insert({name: 'Charlie'})
      ]);
    });
};
