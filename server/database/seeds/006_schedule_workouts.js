const scheduleWorkoutsArr = [];

const getDate = () => {
  const d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDay();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return `${d.getFullYear()}-${month}-${day}`;
};

// for (let i = 0; i < 49; i++) {
//   const d = new Date();
//   let month = d.getMonth() + 1;
//   let day = d.getDay();

//   if (day < 10) {
//     day = '0' + day;
//   }

//   if (month < 10) {
//     month = '0' + month;
//   }

//   const dateString = `${d.getFullYear()}-${month}-${day}`
//   scheduleWorkouts = {
//     user_id: i,
//     title: 'Deadlift Day #1',
//     date: dateString,
//     category_id: 1

//   }
//   scheduleWorkoutsArr.push(scheduleWorkouts)
// }

exports.seed = function(knex, Promise) {
  return knex("schedule_workouts").insert([
    {
      user_id: 1,
      title: "Deadlift Day #1",
      date: getDate(),
      category_id: 1
    },
    {
      user_id: 1,
      title: "Chest Day #1",
      date: "2019-1-25",
      category_id: 2
    },
    {
      user_id: 1,
      title: "Chest Day #1",
      date: "2019-1-26",
      category_id: 2,
      completed: true
    },
    {
      user_id: 1,
      title: "Chest Day #1",
      date: "2019-1-27",
      category_id: 2,
      completed: true
    }
  ]);
};
