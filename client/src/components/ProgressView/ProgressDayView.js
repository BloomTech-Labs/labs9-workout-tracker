import React, { useContext, useState } from "react";
import { Store } from '../../index';
import styled from 'styled-components';
import axios from 'axios';
import firebase from 'firebase'


const ProgressDayView = props => {

    const { state, dispatch } = useContext(Store);

    const sortMetrics = (metrics) => {
        const nM = metrics.map(m => {
            const copy = m;
            copy.date = dateParser(m.date);
            return copy;
        });

        const sortedMetrics = nM.sort((a, b) => {
            a = a.date.split('/').reverse().join('')
            b = b.date.split('/').reverse().join('')
            return a > b ? 1 : a < b ? -1 : 0;
        }).reverse();

        return sortedMetrics;
        
    }

    const dateParser = date => {
        if (date.toString().length === 10) {
            return date
        }

        date = date.split("T")[0].split('-');
    
        return date[0] + "/" + date[1] + "/" + date[2];
    };

    const editMetric = (metric) => {
        dispatch({
            type: 'EDIT_METRIC',
            payload: metric
        })
        dispatch({type:'SHOW_METRIC_FORM'})
    };

    const renderDays = () => {
        return (
            <StyledContainer>
                <h2>Daily Stats</h2>
            {
                state.metrics && sortMetrics(state.metrics).map((m, i) => {
                    return (
                        <DayItem key={i}>
                            <StyledDate>
                                <span>{m.date} </span>
                                <StyledIcon onClick={() => editMetric(m)}><i className="fas fa-edit"></i></StyledIcon>
                            </StyledDate>
                            <StyledStats>
                                <span>Weight: {m.weight} </span>
                                <span>Hips: {m.hips} </span>
                                <span>Waist: {m.waist} </span>
                                <span>LeftArm: {m.arm_left} </span>
                                <span>RightArm: {m.arm_right} </span>
                                <span>LeftLeg: {m.leg_left} </span>
                                <span>RightLeg: {m.leg_right} </span>
                            </StyledStats>
                        </DayItem>
                    );
                })
            }
    
            </StyledContainer>
        );
    }

    return renderDays();
}

export default ProgressDayView;

const StyledStats = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: 40px;
    font-size: 16px;
    font-weight: 500;
`;

const StyledDate = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    font-size: 22px;
    font-weight: 600;
`;


const StyledIcon = styled.span`
    font-size: 18px;
    cursor: pointer;
    color: ${props => props.delete ? 'red' : 'black'};
`;

const StyledContainer = styled.div`
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    margin-top: 120px;
`;

 const DayItem = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-top: solid 1px ${props => props.theme.primaryDark};
    padding: 10px;
 `;
