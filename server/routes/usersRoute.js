const express = require('express');
const db = require('../database/dbConfig')
const router = express.Router();

router.get('/info/:id', async (req, res) => {
    try {
        const userInfo = await db('users').where('id', '=', req.params.id);
        if(userInfo.length === 0) {
            res.status(404).json({message: "That user doesnt exist"});
        }
        userId = userInfo[0].id;
        
        const metrics = await db('metrics').where('user_id', '=', userId)

        const workouts = await db('workouts').where('user_id', '=', userId)
        let workoutsArray = [];
        for (const workout of workouts) {
            const exercises = await db('exercises').where('workout_id', '=', workout.id)
            const category = await db('category').where('id', '=', workout.category_id)
            const workObj = {
                ...workout,
                exercises: [...exercises],
                category: category[0]
            }
            workoutsArray.push(workObj)
        }

        const sWorkouts = await db('schedule_workouts').where('user_id', '=', userId)
        let sWorkoutsArray = [];
        for (const workout of sWorkouts) {
            const exercises = await db('schedule_exercises').where('schedule_workout_id', '=', workout.id)
            const category = await db('category').where('id', '=', workout.category_id)
            const workObj = {
                ...workout,
                exercises: [...exercises],
                category: category[0]
            }
            sWorkoutsArray.push(workObj)
        }
        
        userObj = {
            ...userInfo[0],
            metrics: [...metrics],
            workouts: workoutsArray,
            scheduleWorkouts: sWorkoutsArray
        }
        res.status(200).json(userObj);
    } catch(error) {
        res.status(500).json({error, "Well this is embarrassing": "Something went wrong"})
    }
})


module.exports = router;
