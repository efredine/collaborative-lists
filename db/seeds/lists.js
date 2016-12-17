
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('lists').insert({title: 'Star Wars'}),
        knex('lists').insert({title: 'Something Else'}),
        knex('lists').insert({title: 'The third one'})
      ]);
    });
};
