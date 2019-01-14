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



module.exports = router;
