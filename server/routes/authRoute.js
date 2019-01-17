const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Authenticate a Logged in user
router.post("/user", async (req, res) => {
  try {
    console.log(req.id);
    res.status(200);
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
    const userObj = { ...req.body, uid: req.uid };
    const addUser = await db("users").insert(userObj);
    console.log(addUser);
    res.status(200).json({ message: "Succesfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while registering the user",
      error
    });
  }
});

//Login user
router.post("/login", async (req, res) => {
  try {
    const id = req.id;

    const userObj = await db("users").where("id", "=", id);
    console.log(userObj);

    res.status(200).json(userObj[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while loggin in",
      error
    });
  }
});
module.exports = router;
