import React from "react";
import ProgressListItem from "./ProgressListItem";
import styled from "styled-components";

const ProgressListStyle = styled.div`
  border: 1px solid orange;
  height: 300px;
`;

const ProgressList = props => {
  return (
    <ProgressListStyle>
      {props.metrics !== undefined
        ? props.metrics.map(metricObj => {
            console.log(metricObj);
            return (
              <ProgressListItem key={metricObj.id} metricObj={metricObj} />
            );
          })
        : null}
    </ProgressListStyle>
  );
};

export default ProgressList;
