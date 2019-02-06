import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../../index';
import styled from "styled-components";
import dateFns from "date-fns";


const WeeklyWorkotus = () => {
    const { state, dispatch } = useContext(Store);

    const { scheduleWorkouts, currentDate } = state;
    const [sortedWorkouts, setSortedWorkouts ] = useState([]);

    useEffect(() => {
        getSortedWorkouts();
    }, [state.scheduleWorkouts]);

    const getSortedWorkouts = () => {
        const copy = scheduleWorkouts;
        
        copy.sort((a, b) => {
            const aDate = new Date(a.date)
            const bDate = new Date(b.date)
            return aDate - bDate
        })
        let currentIndex = null;

        for (let i = 0; i < copy.length; i ++) {
            const cDate = new Date(copy[i].date).getDate() + 1;
            const currentD = new Date().getDate();

            if (cDate === currentD) {
                currentIndex = i;
                break;
            } else if (cDate > currentD) {
                if (i === 1) {
                    currentIndex = i;
                    break;
                }
                currentIndex = i - 1;
                break;
            };
        }

        console.log(currentIndex);
        
        if (currentIndex === -1){ 
            setSortedWorkouts([]);
        }


        if (currentIndex !== 0) {
            const copySlice = copy.slice(currentIndex === null ? 0 : currentIndex)
            setSortedWorkouts(copySlice);
        }

        setSortedWorkouts(copy);

    }

    const dateStringParser = date => {
        date = date.split("T")[0].split("-");
      
        const newDate = date[0] + "/" + date[1] + "/" + date[2];
      
        return newDate;
    };

    const onDateClick = (day) => {
        const newDate = new Date(dateStringParser(day));
        dispatch({ type: "UPDATE_CURRENT_DAY", payload: newDate })
        dispatch({ type: "UPDATE_DATE_SELECTED" });
        dispatch({ type: "UPDATE_IS_POPULATED", payload: true })
    };

    return (
        <DisplayWorkouts>
        {
            sortedWorkouts && sortedWorkouts.map((sworkout, i,) => {
                console.log("sworkout", sworkout.date)
                if (i % 2 === 0 && i < 7) {
                    return (
                        <GrayWorkoutCard key={sworkout.id} onClick={() => onDateClick(sworkout.date)}>
                            <h3>{sworkout.title}</h3>
                            <p>{sworkout.category.name}</p>
                            <p>{dateStringParser(sworkout.date)}</p>
                        </GrayWorkoutCard>
                    );
                } else if (i % 2 === 1 && i < 7) {
                    return (
                        <WorkoutCard key={sworkout.id} onClick={() => onDateClick(sworkout.date)}>
                            <h3>{sworkout.title}</h3>
                            <p>{sworkout.category.name}</p>
                            <p>{dateStringParser(sworkout.date)}</p>
                        </WorkoutCard>
                    );
                }
                return null;
            })
        }
      </DisplayWorkouts>
    );
}

export default WeeklyWorkotus;

const DisplayWorkouts = styled.div`
  margin-bottom: 20px;
  display:flex;
  align-items:center;
  cursor: pointer;

  @media (max-width: 690px) {
    flex-direction:column;
    justify-content: center;
  }  

`;


const WorkoutCard = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width: 70%;
max-width: 130px;
align-items:center;
padding: 5px 0;

h3 {
  margin-left: 5%;
  margin-top: 7px;
}

@media(max-width:690px) {
  width:100%;
}
`;

const GrayWorkoutCard = styled(WorkoutCard)`
background-color:rgb(43, 58, 66, 0.1);
cursor: pointer;
`;