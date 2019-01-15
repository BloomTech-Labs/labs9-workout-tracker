// const exerciseArr = []

// for(let i = 1; i < 35; i++) {
//   const exercise1 = {
//     name: 'Deadlift',
//     schedule_workout_id: i,
//     sets: 5,
//     reps: 5,
//     weight: 315
//   }
//   const exercise2 = {
//     name: 'Squats',
//     schedule_workout_id: i,
//     sets: 5,
//     reps: 5,
//     weight: 275
//   }
//   const exercise3 = {
//     name: 'Lunges',
//     schedule_workout_id: i,
//     sets: 3,
//     reps: 24,
//     weight: 25,
//   }
//   exerciseArr.push(exercise1)
//   exerciseArr.push(exercise2)
//   exerciseArr.push(exercise3)
// }

exports.seed = function(knex, Promise) {
  return knex("schedule_exercises").insert([
    {
      id: 0,
      name: "Deadlift",
      schedule_workout_id: 0,
      sets: 5,
      reps: 5,
      weight: 315
    },
    {
      id: 1,
      name: "Squats",
      schedule_workout_id: 0,
      sets: 3,
      reps: 8,
      weight: 275
    },
    {
      id: 2,
      name: "Lunges",
      schedule_workout_id: 0,
      sets: 3,
      reps: 12,
      weight: 25
    }
  ]);
};
