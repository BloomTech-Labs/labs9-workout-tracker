export default {
  id: 0,
  name: "Immanuel Gaylord",
  email: "Kaylee81@hotmail.com",
  phone: "230.496.0750 x777",
  recieves_text: 0,
  recieves_email: 0,
  created_at: "2019-01-09 22:25:30",
  updated_at: "2019-01-09 22:25:30",
  metrics: [
    {
      id: 0,
      created_at: "2019-01-09 22:25:30",
      updated_at: "2019-01-09 22:25:30",
      weight: 8.949818178792476,
      hips: 10.184543677436714,
      waist: 1.3451471321703026,
      arm_right: 5.538224545827334,
      arm_left: 10.74578566478397,
      leg_right: 5.995551222956152,
      leg_left: 2.3589887488329278,
      date: "2019-01-09 22:25:30",
      user_id: 0
    },
    {
      id: 11,
      created_at: "2019-01-10 22:25:30",
      updated_at: "2019-01-10 22:25:30",
      weight: 18.949818178792476,
      hips: 15.184543677436714,
      waist: 10.3451471321703026,
      arm_right: 50.538224545827334,
      arm_left: 100.74578566478397,
      leg_right: 50.995551222956152,
      leg_left: 20.3589887488329278,
      date: "2019-01-10 22:25:30",
      user_id: 0
    },
    {
      id: 2,
      created_at: "2019-01-09 22:25:30",
      updated_at: "2019-01-09 22:25:30",
      weight: 6.949818178792476,
      hips: 12.184543677436714,
      waist: 5.3451471321703026,
      arm_right: 5.538224545827334,
      arm_left: 10.74578566478397,
      leg_right: 5.995551222956152,
      leg_left: 2.3589887488329278,
      date: "2019-01-11 22:25:30",
      user_id: 0
    },
    {
      id: 5,
      created_at: "2019-01-09 22:25:30",
      updated_at: "2019-01-12 22:25:30",
      weight: 25.949818178792476,
      hips: 4.184543677436714,
      waist: 8.3451471321703026,
      arm_right: 5.538224545827334,
      arm_left: 10.74578566478397,
      leg_right: 5.995551222956152,
      leg_left: 2.3589887488329278,
      date: "2019-01-13 22:25:30",
      user_id: 0
    },
    {
      id: 5,
      created_at: "2019-01-09 22:25:30",
      updated_at: "2019-01-09 22:25:30",
      weight: 2.949818178792476,
      hips: 12.184543677436714,
      waist: 18.3451471321703026,
      arm_right: 5.538224545827334,
      arm_left: 10.74578566478397,
      leg_right: 5.995551222956152,
      leg_left: 2.3589887488329278,
      date: "2019-01-14 22:25:30",
      user_id: 0
    }
  ],
  workouts: [
    {
      id: 0,
      user_id: 0,
      category_id: 0,
      title: "Deadlift Day #1",
      exercises: [
        {
          id: 1,
          workout_id: 0,
          name: "Deadlift",
          weight: 315,
          sets: 5,
          reps: 5
        },
        {
          id: 2,
          workout_id: 0,
          name: "Squats",
          weight: 275,
          sets: 5,
          reps: 5
        },
        {
          id: 3,
          workout_id: 0,
          name: "Lunges",
          weight: 25,
          sets: 3,
          reps: 24
        }
      ],
      category: {
        id: 0,
        name: "Legs",
        user_id: 0
      }
    },
    {
      id: 1,
      user_id: 0,
      category_id: 0,
      title: "Deadlift Day #2",
      exercises: [
        {
          id: 4,
          workout_id: 0,
          name: "Deadlift1",
          weight: 315,
          sets: 5,
          reps: 5
        },
        {
          id: 5,
          workout_id: 0,
          name: "Squats",
          weight: 275,
          sets: 5,
          reps: 5
        },
        {
          id: 6,
          workout_id: 0,
          name: "Lunges",
          weight: 25,
          sets: 3,
          reps: 24
        }
      ],
      category: {
        id: 1,
        name: "Legs",
        user_id: 0
      }
    }
  ],
  scheduleWorkouts: [
    {
      id: 1,
      date: "2019-01-19",
      completed: 0,
      percentage: 0,
      title: "Deadlift Day #1",
      category_id: 1,
      user_id: 0,
      exercises: [
        {
          id: 4,
          schedule_workout_id: 1,
          name: "Deadlift",
          weight: 315,
          sets: 5,
          reps: 5,
          completed: 0
        },
        {
          id: 5,
          schedule_workout_id: 1,
          name: "Squats",
          weight: 275,
          sets: 5,
          reps: 5,
          completed: 0
        },
        {
          id: 6,
          schedule_workout_id: 1,
          name: "Lunges",
          weight: 25,
          sets: 3,
          reps: 24,
          completed: 0
        }
      ],
      category: {
        id: 1,
        name: "Legs",
        user_id: 1
      }
    },
    {
      id: 2,
      date: "2019-01-20",
      completed: 0,
      percentage: 0,
      title: "Deadlift Day #3",
      category_id: 2,
      user_id: 0,
      exercises: [
        {
          id: 7,
          schedule_workout_id: 2,
          name: "Deadlift",
          weight: 315,
          sets: 5,
          reps: 5,
          completed: 0
        },
        {
          id: 8,
          schedule_workout_id: 2,
          name: "Squats",
          weight: 275,
          sets: 5,
          reps: 5,
          completed: 0
        },
        {
          id: 9,
          schedule_workout_id: 2,
          name: "Lunges",
          weight: 25,
          sets: 3,
          reps: 24,
          completed: 0
        }
      ],
      category: {
        id: 2,
        name: "Legs",
        user_id: 0
      }
    }
  ]
};
