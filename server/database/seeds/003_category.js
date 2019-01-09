const categoryArr = [];

for(let i = 0; i < 49; i++) {
  const category = {
    id: i,
    name: 'Legs',
    user_id: i,
  }
  categoryArr.push(category)
}

exports.seed = function(knex, Promise) {
      return knex('category').insert(categoryArr);
};
 