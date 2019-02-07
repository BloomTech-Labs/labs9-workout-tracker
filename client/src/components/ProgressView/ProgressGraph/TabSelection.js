import React, { useContext, useEffect } from "react";
import { Store } from '../../../index';
import styled, {css} from "styled-components";

const TabSelection = ({setType}) => {

  const { state, dispatch } = useContext(Store)

  const tabs = [
    {name: "weight", value: "Weight"},
    {name: "hips", value: "Hips"},
    {name: "waist", value: "Waist"},
    {name: "arms", value: "Arms"},
    {name: "legs", value: "Legs"},
  ];

  const updateGraphType = name => {
    dispatch({
      type: "UPDATE_GRAPH_TYPE",
      payload: name
    })
  }

  return (
    <MetricContainer>
      {
        tabs.map((tab, i) => {
          if (tab.name === state.graphType) {
            return (<Metric key={i} onClick={e => updateGraphType(tab.name)} selected>{tab.value}</Metric>)
          }
          return (<Metric key={i} onClick={e => updateGraphType(tab.name)}>{tab.value}</Metric>)
        })
      }
    </MetricContainer>
  );
};

export default TabSelection;

const Metric = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.6rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.theme.accent};
  ${props => props.selected && css`
    border-top: 2px solid ${props => props.theme.accent};
    border-left: 2px solid ${props => props.theme.accent};
    border-right: 2px solid ${props => props.theme.accent};
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background: ${props => props.theme.accent}
    color: white;
  `}

`;

const MetricContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  background-color: white;
  color: ${props => props.theme.primaryDark};
  margin-bottom: 20px;
  margin-top: 40px;
`;
