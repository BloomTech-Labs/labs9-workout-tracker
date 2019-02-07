const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all workouts
router.get("/all", async (req, res) => {
  try {
    const allworkouts = await db
      .select("*")
      .from("workouts")
      .leftJoin("exercises", "workouts.id", "exercises.workout_id")
      .reduce((workout, current) => {
        const { user_id, category_id, title, workout_id } = current;

        workout = {
          ...workout,
          user_id,
          category_id,
          title,
          id: workout_id
        };

        const { name, weight, sets, reps, id } = current;

        const newEx = {
          name,
          weight,
          sets,
          reps,
          id,
          workout_id
        };

        if (workout.exercises) {
          workout.exercises.push(newEx);
        } else {
          workout.exercises = [newEx];
        }

        return workout;
      }, {});

    res.status(200).json(allworkouts);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Get all workouts (no exercises) TEST
router.get("/all/workouts", async (req, res) => {
  try {
    const allworkouts = await db("workouts");

    res.status(200).json(allworkouts);
    //I believe we need to add the workouts that come with the workout here
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Get all exercises TEST
router.get("/all/exercises", async (req, res) => {
  try {
    const allExercises = await db("exercises");

    res.status(200).json(allExercises);
    //I believe we need to add the exercises that come with the workout here
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//GET Workout set by user ID
router.get("/", async (req, res) => {
  try {
    //use the user ID to pull the workouts associated with the user
    const workouts = await db("workouts").where("user_id", "=", req.id);
    console.log(workouts);

    if (!workouts[0]) {
      res.status(200).json("You have no workouts");
      return;
    }

    let workoutsArray = [];

    for (const workout of workouts) {
      //gets exercises that for the corresponding workout
      const exercises = await db("exercises").where(
        "workout_id",
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
      workoutsArray.push(workObj);
    }

    res.status(200).json(workoutsArray);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

// Create new workout for a given user ID
router.post("/", async (req, res) => {
  try {
    //Grab user_id from user table
    let userId = req.id;
    //Create Object from req.body data and user_id
    const insertObj = {
      title: req.body.title,
      category_id: req.body.category_id,
      user_id: userId
    };
    //Insert Obj into workout table to create the workout ID
    const addWorkout = await db("workouts")
      .returning("id")
      .insert(insertObj);

    const workout = {
      ...insertObj,
      id: addWorkout[0]
    };

    if (req.body.exercises) {
      let exercisesArr = req.body.exercises;

      exercisesArr.forEach(ex => (ex.workout_id = workout.id));
      console.log(exercisesArr);

      const addExercises = await db("exercises")
        .returning("id")
        .insert(exercisesArr);

      console.log(addExercises);

      const completeExercises = await db("exercises").where(
        "workout_id",
        "=",
        workout.id
      );

      console.log(completeExercises);
      insertObj.exercises = completeExercises;
    }

    res.status(201).json(insertObj);
  } catch (error) {
    console.log("the error posting a workout is: ", error);
    res.status(500).json({ error });
  }
});

// EDIT set of workouts
router.put("/edit", async (req, res) => {
  //Grab workout ID from req.params.id
  const body = req.body;
  const workoutID = body.id;

  try {
    //Create object from req.body data and user_id
    const editWorkout = {
      title: body.title,
      category_id: body.category_id
    };

    //Update workouts table with new editWorkout object
    const updatedWorkout = await db("workouts")
      .where("id", "=", workoutID)
      .update(editWorkout);

    // Update each exercise in exercises array
    for (const ex of body.exercises) {
      const id = ex.id;
      const workout_id = ex.workout_id;

      if (id) {
        delete ex.id;
        delete ex.workout_id;

        const updateExercises = await db("exercises")
          .whereIn(["id", "workout_id"], [[id, workout_id]])
          .update(ex);
      } else {
        await db("exercises")
          .returning("id")
          .insert(ex);
      }
    }

    const workouts = await db("workouts").where("id", "=", workoutID);

    let workoutsArray = [];

    for (const workout of workouts) {
      //gets exercises that for the corresponding workout
      const exercises = await db("exercises").where(
        "workout_id",
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
      workoutsArray.push(workObj);
    }

    res.status(200).json(workoutsArray);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Edit Exercise
router.put("/edit/exercise/:id", async (req, res) => {
  const exerciseID = req.params.id;
  const { body } = req;

  // checks if proper id is passed
  console.log("exerciseID is: ", exerciseID);
  if (Number.isInteger(exerciseID)) {
    res.status(400).json({ message: "id is required" });
    return;
  }

  //checks if the request body has all required fields for an exercise
  const editedExercise = {
    ...body,
    id: exerciseID
  };

  const { name, reps, sets, id } = editedExercise;
  if (!name && !reps && sets) {
    res.status(400).json({ message: "nothing to update" });
    return;
  }

  //Removes the ID from the scheduled exercise insertObj
  const insertObj = { ...editedExercise };
  delete insertObj.id;

  //Finds the scheduled exercise to update and updates that exercise with the insertObj
  const updatedExercise = await db("exercises")
    .whereIn(["id"], [[id]])
    .update(insertObj);

  if (updatedExercise < 1) {
    res.status(400).json({ message: "Nothing to update" });
    return;
  }

  //Gets the updated exercies that we send back as the response
  const newEx = await db("exercises").where("id", "=", id);

  res.status(200).json(newEx[0]);
});

router.delete("/exercise/delete/:id", async (req, res) => {
  try {
    const deleteWorkoutData = await db("exercises")
      .whereIn(["id"], [[req.params.id]])
      .del();
    {
      deleteWorkoutData === 0
        ? res.status(404).json({ message: "Workout ID does not exist" })
        : res.status(200).json({ deleteWorkoutData });
    }
  } catch (error) {
    res.status(500).json(error, "error message");
  }
});

//Delete workout
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteWorkoutData = await db("workouts")
      .where("id", "=", req.params.id)
      .del();
    {
      deleteWorkoutData === 0
        ? res.status(404).json({ message: "Workout ID does not exist" })
        : res.status(200).json({ deleteWorkoutData });
    }
  } catch (error) {
    res.status(500).json(error, "error message");
  }
});

module.exports = router;
