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
router.get("/:id", async (req, res) => {
    try {
      //grab the user ID from the user's DB
      const userInfo = await db("users").where("id", "=", req.params.id);
      userId = userInfo[0].id;
      //use that user ID to pull the workouts associated with the user
      const SchedWorkoutInfo = await db("schedule_workouts").where("user_id", "=", userId);
      //sched workouts return as an array
      res.status(200).json(SchedWorkoutInfo);
    } catch (error) {
      res.status(500).json({
        "Well this is embarrassing": "Something went wrong",
        error
      });
    }
  });


module.exports = router;
