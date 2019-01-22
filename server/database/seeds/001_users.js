// const faker = require('faker')

// const usersArray = [];

// for (let i = 0; i < 49; i++) {
//   const userObj = {
//     id: i,
//     name: faker.name.findName(),
//     email: faker.internet.email(),
//     phone: faker.phone.phoneNumber(),
//   }

//   usersArray.push(userObj)
// }

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {uid: "w5iY6dJDISWE17ZbaO72QZWLTi62", name: 'Test', email:"test@test.com"}
  ]);
};