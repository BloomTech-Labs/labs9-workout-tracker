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

    // select t1.name, t2.image_id, t3.path
    // from table1 t1 inner join table2 t2 on t1.person_id = t2.person_id
    // inner join table3 t3 on t2.image_id=t3.image_id

    // knex.select('*').from('users').join('contacts', function() {
    //   this.on('users.id', '=', 'contacts.id').onIn('contacts.id', [7, 15, 23, 41])
    // })

    // knex.select('*').from('users').join('accounts', {'accounts.id': 'users.account_id'})

    // const user = await db
    //   .select({
    //     user_id: "users.id",
    //     user_email: "users.email",
    //     user_phone: "users.phone",
    //     user_receives_text: "users.receives_text",
    //     user_created_at: "users.created_at",
    //     user_updated_at: "users.updated_at",
    //     // user_premium: "users.premium",
    //     exercise_id: "exercises.id",
    //     exercise_name: "exercises.name",

    //   })
    //   .from("users")
    //   .innerJoin("workouts", { "workouts.user_id": "users.id" })
    //   .innerJoin("metrics", { "metrics.user_id": "users.id" })
    //   .innerJoin("exercises", { "exercises.workout_id": "workouts.id" })

    // .reduce((user, current) => {
    //   const {
    //     user_id,
    //     name,
    //     email,
    //     phone,
    //     recieves_email,
    //     recieves_text,
    //     weight,
    //     hips,
    //     waist,
    //     arm_right,
    //     arm_left,
    //     leg_right,
    //     leg_left,
    //     date
    //   } = current;

    //   user = {
    //     user_id,
    //     name,
    //     email,
    //     phone,
    //     recieves_email,
    //     recieves_text
    //   };

    //   const newMetric = {
    //     weight,
    //     hips,
    //     waist,
    //     arm_right,
    //     arm_left,
    //     leg_right,
    //     leg_left,
    //     date,
    //     id: metric_id
    //   };

    //   if (user.metrics) {
    //     if(!user.metrics.filter(m => m.id === newMetric.id).length){
    //       user.metrics.push(newMetric);
    //     }
    //   } else {
    //     user.metrics = [newMetric]
    //   }

    //   if (user.workouts) {
    //     if(!user.workouts.filter(m => m.id === newMetric.id).length){
    //       user.metrics.push(newMetric);
    //     }
    //   }

    const userId = req.id;

    const userInfo = await db("users").where("id", "=", userId);

    const userCategories = await db("category").where("user_id", "=", userId);

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
    // console.log(sWorkoutsArray);

    const userObj = {
      ...userInfo[0],
      metrics,
      category: userCategories,
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
//-----------------------DO WE NEED TO ADD SOMETHING TO DELETE FROM FIREBASE DB HERE? ------------------------
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
router.put("/edit", async (req, res) => {
  const { name, email, phone, recieves_text, recieves_email } = req.body;

  if (!name && !email && !phone && !recieves_text && !recieves_email) {
    res.status(400).json({
      errorMessage: "Please provide a name, email, phone for the user"
    });
    return;
  }

  try {
    const updateduserCount = await db("users")
      .where("id", "=", req.id)
      .update(req.body);

    if (updateduserCount === 0) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
      return;
    }

    const updateUser = await db("users").where("id", "=", req.id);

    res.status(200).json(updateUser[0]);
  } catch (error) {
    console.log("the req.params.id is... ", req.id);
    console.log("the error is... ", error);
    res.status(500).json(error);
  }
});

module.exports = router;
