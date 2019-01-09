const scheduleWorkoutsArr = []

for (let i = 0; i < 49; i++) {
  const d = new Date();
  const dateString = `${d.getFullYear}-${d.getMonth}-${d.getDay}`
  scheduleWorkouts = {
    workout_id: i,
    date: dateString
    
  }
  scheduleWorkoutsArr.push(scheduleWorkouts)
}

exports.seed = function(knex, Promise) {
  return knex('schedule_workouts').insert(scheduleWorkoutsArr);
};
