exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      id: 0, 
      username: 'rey',
      password: 'pass'
    },
  ]);
};