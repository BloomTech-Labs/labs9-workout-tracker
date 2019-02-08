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

//GET Metric set by user ID
router.get("/metrics/get", async (req, res) => {
  try {
    const userId = req.id;
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
router.post("/metrics/create", async (req, res) => {
  try {
    let userId = req.id;
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
    console.log("the error posting a metric is: ", error);
    res.status(500).json({ error });
  }
});

//Edit set of metrics by ID
router.put("/metrics/edit/:id", async (req, res) => {
  const body = req.body;

  if (
    !body.weight &&
    !body.hips &&
    !body.waist &&
    !body.arm_right &&
    !body.arm_left &&
    !body.leg_right &&
    !body.leg_left
  ) {
    res.status(400).json({
      errorMessage: "Please provide an update for atleast one field"
    });
    return;
  }

  try {
    // console.log("changes are: ", changes);
    const updateduserCount = await db("metrics")
      .whereIn(["id", "user_id"], [[req.params.id, req.id]])
      .update(body);

    {
      updateduserCount === 0
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json({ updateduserCount });
    }
  } catch (error) {
    res.status(500).json(error);
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
        : res.status(200).json({ deleteMetricData });
    }
  } catch (error) {
    res.status(500).json(error, "error message");
  }
});

module.exports = router;
