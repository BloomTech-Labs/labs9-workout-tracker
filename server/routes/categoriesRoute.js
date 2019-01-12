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

router.post("/create/:id", async (req, res) => {
    const categoryData = req.body;
    console.log(categoryData)
    if (!categoryData.name) {
      res
        .status(422)
        .json({ errorMessage: "Please provide a name for category"});
    } else {
      try {
        const userInfo = await db("users").where("id", "=", req.params.id);
        let userId = userInfo[0].id;
        const name = req.body;
        const insertObj = {
          ...name,
          user_id: userId
        };
        const newCategory = await db('category').insert(insertObj);
        console.log(name, 'message');
        res.status(201).json(insertObj);
      } catch (error) {
        res.status(500).json({
          error:
            "There was an error while saving the category.", error
        })
      }
    } 
});



//GET category by user id 
router.get("/getbyuser/:id", async (req, res) => {
  try {
    //grab the user ID from the user's DB
    const userInfo = await db("users").where("id", "=", req.params.id);
    console.log('userinfo', userInfo)
    userId = userInfo[0].id;
    console.log("cat by userID: ", userId)
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


module.exports = router;
