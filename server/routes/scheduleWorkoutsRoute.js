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

//GET SchedWorkout for given User
router.get("/", async (req, res) => {
  try {
    //use the user ID to pull the workouts associated with the user
    const sWorkouts = await db("schedule_workouts").where(
      "user_id",
      "=",
      req.id
    );

    if (!sWorkouts[0]) {
      res.status(200).json("You have no scheduled workout, go schedule some!");
    }
    let sWorkoutsArray = [];
    for (const workout of sWorkouts) {
      const exercises = await db("schedule_exercises").where(
        "schedule_workout_id",
        "=",
        workout.id
      );
      const category = await db("category").where(
        "id",
        "=",
        workout.category_id
      );
      const workObj = {
        ...workout,
        exercises: [...exercises],
        category: category[0]
      };
      sWorkoutsArray.push(workObj);
    }

    res.status(200).json(sWorkoutsArray);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

// Create new Scheduled Workout given original workout ID
router.post("/create", async (req, res) => {
  const body = req.body;
  const userID = req.id;
  const workoutId = body.workout_id;

  if (!body.date) {
    res.status(401).json({ message: "workout date string required" });
    return;
  } else {
    // console.log("body, userID, workoutID are: ", body, userID, workoutId);
  }

  // Gets the workout from the database to schedule
  const workout = await db("workouts").whereIn(
    ["id", "user_id"],
    [[workoutId, userID]]
  );

  // Gets the exercises for that workout
  const exercises = await db("exercises").where(
    "workout_id",
    "=",
    workout[0].id
  );

  // Create a new scheduleWorkoutObj with the original Workout data at a date
  const scheduleWorkoutObj = {
    user_id: userID,
    title: workout[0].title,
    category_id: workout[0].category_id,
    date: body.date
  };

  // Insert scheduleWorkoutObj with the original Workout data at a date
  const scheduleWorkout = await db("schedule_workouts")
    .returning("id")
    .insert(scheduleWorkoutObj);

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
    const exId = await db("schedule_exercises")
      .returning("id")
      .insert(ex);
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
router.put("/edit/exercise/:id", async (req, res) => {
  try {
    const exerciseID = req.params.id;
    const { body } = req;

    // checks if proper id is passed
    if (Number.isInteger(exerciseID)) {
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
      .whereIn(["id"], [[exerciseID]])
      .update(insertObj);

    if (updatedExercise < 1) {
      res.status(400).json({ message: "Nothing to update" });
      return;
    }

    //Gets the updated exercies that we send back as the response
    const newEx = await db("schedule_exercises").where("id", "=", exerciseID);

    res.status(200).json(newEx[0]);
  } catch (err) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Edit Scheduled Workout
router.put("/edit/workout/:id", async (req, res) => {
  const schedWorkoutID = req.params.id;
  const body = req.body;
  // checks if proper id is passed

  //checks if the request body has all required fields for an workout
  const { date, completed, percentage, title, category_id } = body;
  if (!date && !completed && !percentage && !title && !category_id) {
    res.status(400).json({ message: "nothing to update" });
    return;
  }

  //Removes the ID from the scheduled workout insertObj
  const insertObj = { ...body };
  delete insertObj.id;

  //Finds the scheduled workout to update and updates that workout with the insertObj
  const updatedWorkout = await db("schedule_workouts")
    .whereIn(["id"], [[schedWorkoutID]])
    .update(insertObj);

  console.log(updatedWorkout);
  if (updatedWorkout < 1) {
    res.status(400).json({ message: "Nothing to update" });
    return;
  }

  //Gets the updated workout that we send back as the response
  const newWk = await db("schedule_workouts").where("id", "=", schedWorkoutID);

  console.log(newWk);

  res.status(200).json(newWk[0]);
});

//Delete Scheduled Workout
router.delete("/delete/workout/:id", async (req, res) => {
  try {
    const deleteScheduleWorkout = await db("schedule_workouts")
      .whereIn(["id", "user_id"], [[req.params.id, req.id]])
      .del();
    {
      deleteScheduleWorkout === 0
        ? res
            .status(404)
            .json({ message: "That scheduled workout does not exist" })
        : res.status(200).json({ deleteScheduleWorkout });
    }
  } catch (error) {
    res.status(500).json(error, "error message");
  }
});

module.exports = router;
