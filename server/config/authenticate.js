require("dotenv").config();
const admin = require("firebase-admin");
const db = require("../database/dbConfig");
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "fitmetrix-57cce",
    clientEmail,
    privateKey
  }),
  databaseURL: "https://fitmetrix-57cce.firebaseio.com"
});

async function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      // console.log(decodedToken);
      const users = await db('users').where('uid', '=', decodedToken.uid);
      req.uid = decodedToken.uid;
      req.id = users[0].id
      next();
    } catch (error) {
      res.status(500).json({
        error: "There was an error while authenticating the user",
        error
      });
    }
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}

module.exports = authenticate;
