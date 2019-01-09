import React from "react";
import styled from "styled-components";

const SubmitProgressStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProgSubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

//Will need to make a call to db to add new metric object to the metrics array

const SubmitProgress = props => {
  return (
    <SubmitProgressStyle>
      <ProgSubmitForm>
        <input type="text" placeholder="weight" />
        <input type="text" placeholder="hips" />
        <input type="text" placeholder="waist" />
        <input type="text" placeholder="right arm" />
        <input type="text" placeholder="left arm" />
        <input type="text" placeholder="right leg" />
        <input type="text" placeholder="left leg" />
        <button>Submit</button>
      </ProgSubmitForm>
    </SubmitProgressStyle>
  );
};

export default SubmitProgress;
