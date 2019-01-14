const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Authenticate a Logged in user
router.post("/user", async (req, res) => {
  try {
    console.log(req.id);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while authenticating the user",
      error
    });
  }
});

//Register user
router.post("/register", async (req, res) => {
  try {
    const userObj = { ...req.body, id: req.id };
    const addUser = await db("users").insert(userObj);
    res.status(200).json({ message: "Succesfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while authenticating the user",
      error
    });
  }
});
module.exports = router;
