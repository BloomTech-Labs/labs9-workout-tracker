import React, { useState } from 'react';
import styled from 'styled-components';



const ProgressDayView = ({metrics}) => {

    const dateParser = date => {
        date = date.split("T")[0].split('-');
    
        return date[0] + "/" + date[1] + "/" + date[2];
    };


    return (
        <StyledContainer>
        {
            metrics.map((m, i) => {
                return (
                    <DayItem>
                        <span>Date:{dateParser(m.date)} </span>
                        <span>Weight:{m.weight} </span>
                        <span>Hips:{m.hips} </span>
                        <span>Waist:{m.waist} </span>
                        <span>LeftArm:{m.arm_left} </span>
                        <span>RightArm:{m.arm_right} </span>
                        <span>LeftLeg:{m.leg_left} </span>
                        <span>RightLeg:{m.leg_right} </span>
                    </DayItem>
                );
            })
        }
        </StyledContainer>
    );
}

export default ProgressDayView;

const StyledContainer = styled.div`
    width: 100%;
`;

 const DayItem = styled.div`
    width: 100%;
    height: 50px;
 `;
