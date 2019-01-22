// const exerciseArr = []

// for(let i = 0; i < 49; i++) {
//   const exercise1 = {
//     name: 'Deadlift',
//     workout_id: i,
//     sets: 5,
//     reps: 5,
//     weight: 315
//   }
//   const exercise2 = {
//     name: 'Squats',
//     workout_id: i,
//     sets: 5,
//     reps: 5,
//     weight: 275
//   }
//   const exercise3 = {
//     name: 'Lunges',
//     workout_id: i,
//     sets: 3,
//     reps: 24,
//     weight: 25,
//   }
//   exerciseArr.push(exercise1)
//   exerciseArr.push(exercise2)
//   exerciseArr.push(exercise3)
// }

exports.seed = function(knex, Promise) {
  return knex("exercises").insert([
    { name: "Deadlift", workout_id: 1, sets: 5, reps: 5, weight: 315 },
    { name: "Squats", workout_id: 1, sets: 3, reps: 8, weight: 275 },
    { name: "Lunges", workout_id: 1, sets: 3, reps: 12, weight: 25 },
    { name: "Bench Press", workout_id: 2, sets: 3, reps: 5, weight: 245 },
    { name: "Incline DB", workout_id: 2, sets: 3, reps: 10, weight: 75 },
    { name: "Dips", workout_id: 2, sets: 3, reps: 10, weight: 0 }
  ]);
};
