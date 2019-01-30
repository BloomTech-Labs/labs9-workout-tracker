import React, { useContext } from 'react';
import { Store } from '../../../index';
import AddWorkout from './AddWorkout';
import EditWorkout from './EditWorkout';

const WorkoutModule = props => {
  const { state } = useContext(Store);

  return <>{state.editWorkout === null ? <AddWorkout /> : <EditWorkout />}</>;
};

export default WorkoutModule;
