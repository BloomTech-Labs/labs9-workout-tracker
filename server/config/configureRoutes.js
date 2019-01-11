const defaultRoute = require("../routes/defaultRoute");
const userRoute = require("../routes/usersRoute");
const metricRoute = require("../routes/metricRoute");
const workoutsRoute = require("../routes/workoutsRoute");
const categoryRoute = require("../routes/categoriesRoute");

module.exports = server => {
  server.use("/alive", defaultRoute);
  server.use("/api/user", userRoute);
  server.use("/api/progress", metricRoute);
  server.use("/api/workouts", workoutsRoute);
  server.use("/api/categories", categoryRoute);
};
