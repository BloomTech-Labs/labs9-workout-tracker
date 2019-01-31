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
      user_id: 1,
      category_id: 1,
      title: "Deadlift Day #1"
    },
    {
      user_id: 1,
      category_id: 2,
      title: "Chest Day #1"
    },
    {
      user_id: 1,
      category_id: 2,
      title: "Arm Day #1"
    }
  ]);
};
