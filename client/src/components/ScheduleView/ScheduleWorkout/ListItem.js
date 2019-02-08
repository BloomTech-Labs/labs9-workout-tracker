import React from "react";
import styled from "styled-components";

const ListItem = props => {
  return (
    <ListItemStyle>
      workout list {props.scheduleWorkout.category.name}
    </ListItemStyle>
  );
};

const ListItemStyle = styled.div`
  border: 1px solid pink;
  min-height: 400px;
`;

export default ListItem;
