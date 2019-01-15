const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all schedule workouts
router.get("/all", async (req, res) => {
  try {
    const allSchedWorkouts = await db("scheduleworkouts");
    res.status(200).json(allSchedWorkouts);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//GET SchedWorkout set
router.get("/", async (req, res) => {
  try {
    //use that user ID to pull the workouts associated with the user
    const scheduleWorkouts = await db("schedule_workouts").where(
      "user_id",
      "=",
      req.id
    );
    const exercises = await db("schedule_exercises").where(
      "schedule_workout_id",
      "=",
      scheduleWorkouts[0].id
    );

    const returnObj = {
      ...scheduleWorkouts[0],
      exercises
    };

    res.status(200).json(returnObj);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

// Create new Workout
router.post("/create", async (req, res) => {
  const { body, id } = req;

  if (!body.workout || !body.date) {
    res.status(401).json({ message: "workout id and date string required" });
    return;
  }

  const workout = await db("workouts").whereIn(
    ["id", "user_id"],
    [[body.workout.id, id]]
  );

  const exercises = await db("exercises").where(
    "workout_id",
    "=",
    workout[0].id
  );

  const scheduleWorkoutObj = {
    user_id: id,
    title: workout[0].title,
    category_id: workout[0].category_id,
    date: body.date
  };

  const scheduleWorkout = await db("schedule_workouts").insert(
    scheduleWorkoutObj
  );

  const resWorkout = await db("schedule_workouts").where(
    "id",
    "=",
    scheduleWorkout[0]
  );

  exercises.forEach(ex => {
    delete ex.id;
    delete ex.workout_id;
    ex.schedule_workout_id = scheduleWorkout[0];
  });

  const insertedEx = [];

  for (ex of exercises) {
    const exId = await db("schedule_exercises").insert(ex);
    insertedEx.push(exId);
  }

  const resExercises = await db("schedule_exercises").whereIn("id", insertedEx);

  const resObj = {
    ...resWorkout[0],
    exercises: resExercises
  };

  res.status(201).json(resObj);
});

//Edit SchedWorkout

module.exports = router;
