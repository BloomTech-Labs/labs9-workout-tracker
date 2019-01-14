const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allUsers = await db("users");
    console.log("All the users are", allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Get single User
router.get("/info/:id", async (req, res) => {
  try {
    const userInfo = await db("users").where("id", "=", req.params.id);
    if (userInfo.length === 0) {
      res.status(404).json({ message: "That user doesnt exist" });
    }
    userId = userInfo[0].id;

    const metrics = await db("metrics").where("user_id", "=", userId);

    const workouts = await db("workouts").where("user_id", "=", userId);
    let workoutsArray = [];
    for (const workout of workouts) {
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

    const sWorkouts = await db("schedule_workouts").where(
      "user_id",
      "=",
      userId
    );
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

    userObj = {
      ...userInfo[0],
      metrics: [...metrics],
      workouts: workoutsArray,
      scheduleWorkouts: sWorkoutsArray
    };
    res.status(200).json(userObj);
  } catch (error) {
    res
      .status(500)
      .json({ error, "Well this is embarrassing": "Something went wrong" });
  }
});

//Create new User
router.post("/", async (req, res) => {
  const UserData = req.body;
  console.log(req.body);
  if (!UserData.name || !UserData.email || !UserData.phone) {
    res
      .status(422)
      .json({ errorMessage: "Please provide a name, email, and phone number" });
  } else if (!db("users").where("id", "=", req.params.id)) {
    res.status(405).json({ errorMessage: "Duplicate User Titles Not Allowed" });
  } else {
    try {
      const newUser = await db("users").insert(UserData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({
        error:
          "There was an error while saving the user to the database. The error is ",
        error
      });
    }
  }
});

//Delete User
router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteduserCount = await db("users")
      .where("id", "=", req.params.id)
      .del(userId);
    {
      deleteduserCount === 0
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json({ deleteduserCount });
    }
  } catch (error) {
    console.log("the req.params.id is... ", req.params.id);
    console.log("the error is... ", error);

    res.status(500).json("the error is... ", error);
  }
});

//Edit User
router.put("/edit/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  if (
    !{ name, email, phone }.name ||
    !{ name, email, phone }.email ||
    !{ name, email, phone }.phone
  ) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name/email/phone for the user" });
  }

  try {
    console.log("id is: ", id);
    // console.log("changes are: ", changes);
    const updateduserCount = await db("users")
      .where("id", "=", req.params.id)
      .update({ email, phone, name });

    {
      updateduserCount === 0
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json({ updateduserCount });
    }
  } catch (error) {
    console.log("the req.params.id is... ", req.params.id);
    console.log("the error is... ", error);
    res.status(500).json(error);
  }
});

module.exports = router;
