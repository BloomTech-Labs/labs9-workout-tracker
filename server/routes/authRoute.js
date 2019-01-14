const admin = require("firebase-admin");
const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

admin.initializeApp({
    credential: admin.credential.cert({
      projectId: '<PROJECT_ID>',
      clientEmail: 'foo@<PROJECT_ID>.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n'
    }),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

//Authenticate a Logged in user
router.post("/user", async (req, res) => {
  console.log(req);
  try {
    admin.auth().verifyIdToken(req)
    function(decodedToken) {
      var uid = decodedToken.uid;
      // ...
    }
  }
 
  catch (error) {
    res.status(500).json({
      error:
        "There was an error while authenticating the u",
      error
    });
});

module.exports = router;
