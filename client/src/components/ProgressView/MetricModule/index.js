import React, { useContext } from "react";
import { Store } from "../../../index";
import AddMetric from "./AddMetric";
import EditMetric from "./EditMetric";

import "react-datepicker/dist/react-datepicker.css";

const MetricModule = props => {
  const { state } = useContext(Store);

  return <>{state.editMetric === null ? <AddMetric /> : <EditMetric />}</>;
};

export default MetricModule;
