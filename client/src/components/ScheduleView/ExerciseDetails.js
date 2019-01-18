import React, {useState} from 'react';


const ExerciseDetails = (props) => {
    const [status, setStatus] = useState(props.exercise.completed)

    return ( 
        <div key={props.exercise.id}>
        <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)}/>
  <p > {props.exercise.name}</p>
                  <p>Weight: {props.exercise.weight}</p>
                  <p>Sets: {props.exercise.sets}</p>
                  <p>Reps: {props.exercise.reps}</p>
    </div> );
}
 
export default ExerciseDetails;

