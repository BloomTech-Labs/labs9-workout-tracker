const exerciseArr = []

for(let i = 0; i < 49; i++) {
  const exercise1 = {
    name: 'Deadlift',
    schedule_workout_id: i,
    sets: 5,
    reps: 5,
    weight: 315
  }
  const exercise2 = {
    name: 'Squats',
    schedule_workout_id: i,
    sets: 5,
    reps: 5,
    weight: 275
  }
  const exercise3 = {
    name: 'Lunges',
    schedule_workout_id: i,
    sets: 3,
    reps: 24,
    weight: 25,
  }
  exerciseArr.push(exercise1)
  exerciseArr.push(exercise2)
  exerciseArr.push(exercise3)
}

exports.seed = function(knex, Promise) {
      return knex('schedule_exercises').insert(exerciseArr);
};
