const defaultRoute = require("../routes/defaultRoute");
const userRoute = require("../routes/usersRoute");
const metricRoute = require("../routes/metricRoute");
const workoutsRoute = require("../routes/workoutsRoute");
<<<<<<< HEAD
const categoryRoute = require("../routes/categoryRoute");
=======
const categoryRoute = require("../routes/categoriesRoute");
>>>>>>> e61d9ecec6d68c0a1704c74378d203a856d6916f

module.exports = server => {
  server.use("/alive", defaultRoute);
  server.use("/api/user", userRoute);
  server.use("/api/progress", metricRoute);
  server.use("/api/workouts", workoutsRoute);
  server.use("/api/categories", categoryRoute);
};
