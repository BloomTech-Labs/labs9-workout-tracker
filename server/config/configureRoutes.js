const defaultRoute = require("../routes/defaultRoute");
const userRoute = require("../routes/usersRoute");
const metricRoute = require("../routes/metricRoute");
const workoutsRoute = require("../routes/workoutsRoute");
const categoryRoute = require("../routes/categoriesRoute");
const authRoute = require("../routes/authRoute");
const categoriesRoute = require("../routes/categoriesRoute");
const scheduleWorkoutsRoute = require("../routes/scheduleWorkoutsRoute");

const authenticate = require("./authenticate");

module.exports = server => {
  server.use("/alive", defaultRoute);
  server.use("/auth", authenticate, authRoute);
  server.use("/api/user", authenticate, userRoute);
  server.use("/api/progress", authenticate, metricRoute);
  server.use("/api/workouts", authenticate, workoutsRoute);
  server.use("/api/categories", authenticate, categoryRoute);
  server.use("/api/categories", authenticate, categoriesRoute);
  server.use("/api/schedule", authenticate, scheduleWorkoutsRoute);
};
