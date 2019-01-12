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

router.post("/categories", async (req, res) => {
  try {
    const categoryInfo = await db("category").where("id", "=", req.params.id);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
