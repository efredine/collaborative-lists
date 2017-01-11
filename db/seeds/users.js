exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Eric'}),
        knex('users').insert({name: 'Nathan'}),
        knex('users').insert({name: 'Faisal'})
      ]);
    });
};
