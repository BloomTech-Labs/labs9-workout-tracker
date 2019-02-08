const express = require("express");
const Router = express.Router();
const db = require("../database/dbConfig");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

Router.route("/").get((req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString()
  });
});

Router.route("/").post(async (req, res) => {
  console.log(req.body.token.email);
  // Find the current user
  const user = await db("users").where("email", "=", req.body.token.email);
  if (user.length === 0) {
    return res.status(500).send("user not found");
  }
  console.log(user[0].email);
  // Create the customer in Stripe
  const customer = stripe.customers
    .create({
      email: user[0].email,
      source: req.body.token.id,
      plan: process.env.STRIPE_PLAN_ID
    })
    .catch(err => res.status(500).send(err));
  // Add the stripeID and premium status to user
  await db("users")
    .where("email", "=", req.body.token.email)
    .update({ premium: true });
  res.status(200).send(customer);
});

module.exports = Router;
