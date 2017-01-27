exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'Eric'}),
        knex('users').insert({username: 'Nathan'}),
        knex('users').insert({username: 'Faisal'})
      ]);
    });
};
