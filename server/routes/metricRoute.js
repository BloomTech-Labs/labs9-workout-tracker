const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all metrics
router.get("/metrics/all", async (req, res) => {
  try {
    const allMetrics = await db("metrics");
    res.status(200).json(allMetrics);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//GET Metric set
router.get("/metrics/get/:id", async (req, res) => {
  try {
    //grab the user ID from the user's DB
    const userInfo = await db("users").where("id", "=", req.params.id);
    userId = userInfo[0].id;
    //use that user ID to pull the metrics associated with the user
    const metricInfo = await db("metrics").where("user_id", "=", userId);
    //metrics return as an array
    res.status(200).json(metricInfo);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//Create new set of metrics
router.post("/metrics/create/:id", async (req, res) => {
  try {
    const userInfo = await db("users").where("id", "=", req.params.id);
    let userId = userInfo[0].id;
    console.log(userInfo);
    const metricObj = ({
      weight,
      hips,
      waist,
      arm_right,
      arm_left,
      leg_right,
      leg_left
    } = req.body);

    const insertObj = {
      ...metricObj,
      user_id: userId
    };

    console.log(insertObj);
    const addMetric = await db("metrics").insert(insertObj);
    console.log(addMetric);
    res.status(201).json(insertObj);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Delete metrics
router.delete("/metrics/delete/:id", async (req, res) => {
  try {
    const deleteMetricData = await db("metrics")
      .where("id", "=", req.params.id)
      .del();
    {
      deleteMetricData === 0
        ? res.status(404).json({ message: "Those metrics do not exist" })
        : res.status(200).json({ deleteMetricData })
    }
  } catch (error) {
    res.status(500).json(error, "error message");
  }
});

module.exports = router;
