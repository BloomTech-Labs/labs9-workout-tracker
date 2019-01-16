const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all schedule workouts
router.get("/all", async (req, res) => {
  try {
    const allSchedWorkouts = await db("schedule_workouts");
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
    //use the user ID to pull the workouts associated with the user
    const scheduleWorkouts = await db("schedule_workouts").where(
      "user_id",
      "=",
      req.id
    );

    //gets scheduled exercises that for the corresponding scheduled workout
    const exercises = await db("schedule_exercises").where(
      "schedule_workout_id",
      "=",
      scheduleWorkouts[0].id
    );

    // returnObj gets the scheduled workout and it's exercises assigned to it
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

// Create new Scheduled Workout
router.post("/create/:id", async (req, res) => {
  const { body } = req;
  const id = req.params.id

  if (!body.date) {
    res.status(401).json({ message: "workout date string required" });
    return;
  }

  // Gets the workout from the database to schedule
  const workout = await db("workouts").whereIn(
    ["id", "user_id"],
    [[id, req.id]]
  );

  // Gets the exercises for that workout
  const exercises = await db("exercises").where(
    "workout_id",
    "=",
    workout[0].id
  );

  // Create a new scheduleWorkoutObj with the original Workout data at a date
  const scheduleWorkoutObj = {
    user_id: id,
    title: workout[0].title,
    category_id: workout[0].category_id,
    date: body.date
  };

  // Insert scheduleWorkoutObj with the original Workout data at a date
  const scheduleWorkout = await db("schedule_workouts").insert(
    scheduleWorkoutObj
  );

  // Get resWorkout which is the Scheduled workout we just added
  const resWorkout = await db("schedule_workouts").where(
    "id",
    "=",
    scheduleWorkout[0]
  );

  // Delete & update the id & workout_id of the workout exercises
  exercises.forEach(ex => {
    delete ex.id;
    delete ex.workout_id;
    ex.schedule_workout_id = scheduleWorkout[0];
  });

  // Initialize insertedEx array then for each updated exercise we add them to the "schedule_exercises" table and push them to the insertedEx array
  const insertedEx = [];

  for (ex of exercises) {
    const exId = await db("schedule_exercises").insert(ex);
    insertedEx.push(exId);
  }

  //get the scheduled exercises we just added to the "schedule_exercises" table
  const resExercises = await db("schedule_exercises").whereIn("id", insertedEx);

  // the resObj now represents the newly scheduled workout and the scheduled exercises
  const resObj = {
    ...resWorkout[0],
    exercises: resExercises
  };

  res.status(201).json(resObj);
});

//Edit Scheduled Exercise
router.put("/edit/exercise", async (req, res) => {
  const { body } = req;

  // checks if proper id is passed
  if (!Number.isInteger(body.id)) {
    res.status(400).json({ message: "id is required" });
    return;
  }

  //checks if the request body has all required fields for an exercise  
  const { name, reps, sets, completed, id } = body;
  if (!name && !reps && sets && !completed) {
    res.status(400).json({ message: "nothing to update" });
    return;
  }

  //Removes the ID from the scheduled exercise insertObj
  const insertObj = { ...body };
  delete insertObj.id;

  //Finds the scheduled exercise to update and updates that exercise with the insertObj
  const updatedExercise = await db("schedule_exercises")
    .whereIn(["id"], [[id]])
    .update(insertObj);

  //Gets the updated exercies that we send back as the response
  const newEx = await db("schedule_exercises").where("id", "=", id);

  res.status(200).json(newEx[0]);
});

//Edit Scheduled Workout
router.put("/edit/workout", async (req, res) => {
  const { body } = req;
  // checks if proper id is passed
  if (!Number.isInteger(body.id)) {
    res.status(400).json({ message: "id is required" });
    return;
  }

  //checks if the request body has all required fields for an workout
  const { id, date, completed, percentage, title, category_id } = body;
  if (!id && !date && completed && !percentage && !title && !category_id) {
    res.status(400).json({ message: "nothing to update" });
    return;
  }

  //Removes the ID from the scheduled workout insertObj
  const insertObj = { ...body };
  delete insertObj.id;

  //Finds the scheduled workout to update and updates that workout with the insertObj
  const updatedWorkout = await db("schedule_workouts")
    .whereIn(["id"], [[id]])
    .update(insertObj);

  //Gets the updated workout that we send back as the response
  const newWk = await db("schedule_workouts").where("id", "=", id);

  res.status(200).json(newWk[0]);
});

module.exports = router;
