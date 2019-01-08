import React from 'react';
import SideNav from '../SideNav';
import EditWorkout from './EditWorkout';

class WorkoutsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>workoutsview
            <SideNav />
            <EditWorkout/>
        </div> );
    }
}
 
export default WorkoutsView;