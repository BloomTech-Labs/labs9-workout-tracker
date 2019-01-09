const workoutArray = [];

for (let i = 0; i< 99; i ++) {
  const workout = {
    id: i,
    user_id: i,
    category_id: i,
    title: 'Deadlift Day #1'
  }

  workoutArray.push(workout);
}

exports.seed = function(knex, Promise) {
    return knex('workouts').insert(workoutArray);
};
