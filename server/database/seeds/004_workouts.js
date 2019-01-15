// const workoutArray = [];

// for (let i = 0; i< 49; i ++) {
//   const workout = {
//     id: i,
//     user_id: i,
//     category_id: i,
//     title: 'Deadlift Day #1'
//   }

//   workoutArray.push(workout);
// }

exports.seed = function(knex, Promise) {
  return knex("workouts").insert([
    {
      id: 0,
      user_id: "w5iY6dJDISWE17ZbaO72QZWLTi62",
      category_id: 0,
      title: "Deadlift Day #1"
    }
  ]);
};
