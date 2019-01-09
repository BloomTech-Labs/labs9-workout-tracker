const metricsArr = [];

const randomMetric = () => (Math.random() * 10) + 1;

for (let i = 0; i < 49; i++) {
  const userMetrics = {
    id: i,
    weight: randomMetric(),
    hips:randomMetric(),
    waist:randomMetric(),
    arm_right:randomMetric(),
    arm_left:randomMetric(),
    leg_right:randomMetric(),
    leg_left:randomMetric(),
    user_id: i,
  };
  metricsArr.push(userMetrics)
}

exports.seed = function(knex, Promise) {

  return knex('metrics').insert(metricsArr);

};
