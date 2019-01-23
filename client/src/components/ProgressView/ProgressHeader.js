import React, { useEffect } from "react";
import styled from "styled-components";

const ProgressHeader = props => {
  const { metrics, setType } = props;

  const renderMetrics = () => {
    let earliest = { date: null, index: null };
    let latest = { date: null, index: null };

    metrics.forEach((m, i) => {
      if (m.date < earliest.date || earliest.date === null) {
        earliest.date = m.date;
        earliest.index = i;
      }
      if (m.date > latest.date || latest.date === null) {
        latest.date = m.date;
        latest.index = i;
      }
    });

    const keys = Object.keys(metrics[0]).filter(
      key =>
        ["id", "created_at", "updated_at", "user_id", "date"].indexOf(key) < 0
    );

    return keys.map((k, i) => {
      const progress = metrics[latest.index][k] - metrics[earliest.index][k];

      return (
        <Metric key={i} onClick={e => setType(k)}>
          <span>
            {Math.round(10 * progress) / 10}
            {k === "weight" ? " lbs" : " in"}
          </span>
          <span>
            {
              k
              .toUpperCase()
              .replace(/LEFT/g, 'L')
              .replace(/RIGHT/g, 'R')
              .split("_")
              .join(" ")
            }
          </span>
        </Metric>
      );
    });
  };

  useEffect(
    () => {
      renderMetrics();
    },
    [metrics]
  );

  return <MetricContainer>{renderMetrics()}</MetricContainer>;
};

export default ProgressHeader;

const Metric = styled.div`
  width: 80px;
  height: 65px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
`;

const MetricContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
