import React from "react";
import styled from "styled-components";

const ProgressListItemStyle = styled.div``;

const ProgressListItem = props => {
  return (
    <ProgressListItemStyle>
      <p>weight: {props.metricObj.weight}</p>
      <p>waist: {props.metricObj.waist}</p>
      <p>hips: {props.metricObj.hips}</p>
    </ProgressListItemStyle>
  );
};

export default ProgressListItem;
