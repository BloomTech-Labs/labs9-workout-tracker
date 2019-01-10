const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all workouts
router.get("/all", async (req, res) => {
  try {
    const allWorkouts = await db("workouts");
    res.status(200).json(allWorkouts);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//GET Workout set
router.get("/:id", async (req, res) => {
  try {
    //grab the user ID from the user's DB
    const userInfo = await db("users").where("id", "=", req.params.id);
    userId = userInfo[0].id;
    //use that user ID to pull the workouts associated with the user
    const workoutInfo = await db("workouts").where("user_id", "=", userId);
    //workouts return as an array
    res.status(200).json(workoutInfo);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Create new set of workouts
// router.post("/:id", async (req, res) => {
//   try {
//     const userInfo = await db("users").where("id", "=", req.params.id);
//     let userId = userInfo[0].id;
//     //Here is the confusion. What needs to be in req.body here?
//     const workoutObj = ({ title, category_id, exercises } = req.body);

//     const insertObj = {
//       ...workoutObj,
//       user_id: userId
//     };

//     console.log(insertObj);
//     const addWorkout = await db("workouts").insert(insertObj);
//     console.log(addWorkout);
//     res.status(201).json(insertObj);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

module.exports = router;
