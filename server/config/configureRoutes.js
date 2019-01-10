const defaultRoute = require("../routes/defaultRoute");
const userRoute = require("../routes/usersRoute");
const metricRoute = require("../routes/metricRoute");

module.exports = server => {
  server.use("/alive", defaultRoute);
  server.use("/api/user", userRoute);
  server.use("/api/workouts", metricRoute);
};
