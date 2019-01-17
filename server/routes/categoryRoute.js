const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all categories
router.get("/all", async (req, res) => {
  try {
    const allCategories = await db("category");
    console.log(allCategories);
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Create new category for a specific user
router.post("/create", async (req, res) => {
  const categoryData = req.body;
  console.log(categoryData);
  if (!categoryData.name) {
    res
      .status(422)
      .json({ errorMessage: "Please provide a name for category" });
  } else {
    try {
      const name = req.body;
      const insertObj = {
        ...name,
        user_id: req.id
      };
      const newCategory = await db("category").insert(insertObj);
      console.log(name, "message");
      res.status(201).json(insertObj);
    } catch (error) {
      res.status(500).json({
        error: "There was an error while saving the category.",
        error
      });
    }
  }
});

//GET category by user id
router.get("/user", async (req, res) => {
  try {
    userId = req.id;
    //use that user ID to pull the categories associated with the user
    const categoryInfo = await db("category").where("user_id", "=", userId);
    //categories return as an array
    res.status(200).json(categoryInfo);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Edit Category by category id
router.put("/edit/:id", async (req, res) => {
  const name = req.body.name;
  //Make sure name has a length else return error message
  if (name.length === 0) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the category" });
  }

  try {
    //Find Category that matches req.params.id above
    const categoryInfo = await db("category").where("id", "=", req.params.id);

    //create object based on changes
    const categoryBody = {
      name,
      id: categoryInfo[0].id,
      user_id: categoryInfo[0].user_id
    };

    //Update category with new body
    const editCategory = await db("category")
      .where("id", "=", categoryBody.id)
      .update(categoryBody);

    //return new Edited category
    res.status(200).json(categoryBody);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Delete Category by category id
router.delete("/delete/:id", async (req, res) => {
  //grab categories ID from req.params
  const catId = req.params.id;

  try {
    //Grab all the workouts that have a matching category_id
    const workoutsFromCategory = await db("workouts").where(
      "category_id",
      "=",
      catId
    );

    //Loop through the workouts array

    for (let workout of workoutsFromCategory) {
      //Make a second call to workouts where id is equal to editedWorkout id, then update that

      const updateWorkout = await db("workouts")
        .where("id", "=", workout.id)
        .update({ category_id: null });
    }

    //Same as above, but for schedule workouts. Grab all the Sworkouts that have a matching category_id

    const sWorkoutsFromCategory = await db("schedule_workouts").where(
      "category_id",
      "=",
      catId
    );

    //Loop through the Sworkouts array

    for (let workout of sWorkoutsFromCategory) {
      //Make a second call to Sworkouts where id is equal to editedWorkout id, then update that

      const updateWorkout = await db("schedule_workouts")
        .where("id", "=", workout.id)
        .update({ category_id: null });
    }

    //Make a call to category where id is equal to catId, and delete that id

    const deleteCategory = await db("category")
      .where("id", "=", catId)
      .delete(catId);

    //Return success message
    res.send(200).json({ message: "Category has been deleted" });
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

module.exports = router;
