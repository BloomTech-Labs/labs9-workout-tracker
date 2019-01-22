const metricsArr = [];

const randomMetric = () => Math.random() * 10 + 1;

// for (let i = 0; i < 49; i++) {
//   const userMetrics = {
//
//     weight: randomMetric(),
//     hips:randomMetric(),
//     waist:randomMetric(),
//     arm_right:randomMetric(),
//     arm_left:randomMetric(),
//     leg_right:randomMetric(),
//     leg_left:randomMetric(),
//     user_id: i,
//   };
//   metricsArr.push(userMetrics)
// }

exports.seed = function(knex, Promise) {
  return knex("metrics").insert([
    {
      weight: randomMetric(),
      hips: randomMetric(),
      waist: randomMetric(),
      arm_right: randomMetric(),
      arm_left: randomMetric(),
      leg_right: randomMetric(),
      leg_left: randomMetric(),
      date: "2019-01-16",
      user_id: 1
    },
    {
      weight: randomMetric(),
      hips: randomMetric(),
      waist: randomMetric(),
      arm_right: randomMetric(),
      arm_left: randomMetric(),
      leg_right: randomMetric(),
      leg_left: randomMetric(),
      date: "2019-01-17",
      user_id: 1
    },
    {
      weight: randomMetric(),
      hips: randomMetric(),
      waist: randomMetric(),
      arm_right: randomMetric(),
      arm_left: randomMetric(),
      leg_right: randomMetric(),
      leg_left: randomMetric(),
      date: "2019-01-18",
      user_id: 1
    },
    {
      weight: randomMetric(),
      hips: randomMetric(),
      waist: randomMetric(),
      arm_right: randomMetric(),
      arm_left: randomMetric(),
      leg_right: randomMetric(),
      leg_left: randomMetric(),
      date: "2019-01-19",
      user_id: 1
    },
    {
      weight: randomMetric(),
      hips: randomMetric(),
      waist: randomMetric(),
      arm_right: randomMetric(),
      arm_left: randomMetric(),
      leg_right: randomMetric(),
      leg_left: randomMetric(),
      date: "2019-01-20",
      user_id: 1
    },
  ]);
};
