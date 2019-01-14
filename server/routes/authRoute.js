const admin = require("firebase-admin");
const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Authenticate a Logged in user
router.post("/user", async (req, res) => {
  console.log(req);
});

module.exports = router;
