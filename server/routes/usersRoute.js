const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all users
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
router.get("/", async (req, res) => {
  try {
    //Sets a userID from the userInfo & then finds that user's metrics and workouts with that userID

    // const user = db('users')
    // .join('workouts as w','w.id', 'workouts.user_id',)
    // .join('metrics as m', 'm.user_id', 'metrics.user_id')
    // .join('exercises as e', 'e.workout_id', 'workout.id')
    // .select('u.name', 'workouts.title', 'metrics.weight')
    // .then(user => {
    //            user.map((user) => {
    //            console.log(user);
    //            })
    // //        })
    // res.status(200).json(user);
    //   } catch (error) {
    //     res
    //       .status(500)
    //       .json({ error, "Well this is embarrassing": "Something went wrong" });
    //   }
    // });

    // .then(user => {
    //            user.map((user) => {
    //            console.log(user.name);
    //            })

    //     var knex = require('./db')
    //      knex('follow')
    //      .join('users as u1', 'u1.id', 'follow.follower')
    //      join('users as u2', 'u2.id', 'follow.followee')
    //      .select('u1.username as follower_name', 'u2.username as followee_name')
    //      .then(user => {
    //          follows.map((follow) => {
    //          console.log(follow.follower_name + " -> " + follow.followee_name);
    //          })
    //      })
        
    // const user = await db
    //   .select("*")
    //   .from("users")
    //   .leftJoin("metrics", "users.id", "metrics.user_id")
    //   .leftJoin("workouts", "users.id", "workouts.user_id")
    //   .leftJoin("exercises", "workouts.id", "exercises.workout_id");
    // .whereIn(["metrics.user_id","users.user_id"], [[userId, userId]])

    // .leftJoin("exercises", "workouts.id", "exercises.workout_id")

    // .innerJoin('workouts', 'user.id', 'workouts.user_id');
    // userObj = {
    //   ...userInfo[0],
    //   metrics: [...metrics],
    //   workouts: workoutsArray,
    //   scheduleWorkouts: sWorkoutsArray
    // };
    //     res.status(200).json(user);
    //   } catch (error) {
    //     res
    //       .status(500)
    //       .json({ error, "Well this is embarrassing": "Something went wrong" });
    //   }
    // });
    // reduce((user, current) => {

    //   const user = {...current};

    //   const newWorkout
    //   if(user.workouts) {
    //     user.workouts = [current]
    //   }


    // }, {})
  
    const userId = req.id;
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
