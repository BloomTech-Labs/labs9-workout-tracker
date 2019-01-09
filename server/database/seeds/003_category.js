const categoryArr = [];

for(let i = 0; i < 99; i++) {
  const category = {
    id: i,
    name: 'Upperbody',
    user_id: i,
  }
  categoryArr.push(category)
}

console.log('category length: ', categoryArr.length);

exports.seed = function(knex, Promise) {
      return knex('category').insert(categoryArr);
};
