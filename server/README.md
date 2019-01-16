# fitmetrix 
#### fitmetrix.herokuapp.com

# Back-End

#### Dependencies
- cors
- express
- faker
- helmet
- knex
- morgan

## Scripts
`npm run start`: Runs server once using node index.js
`npm run server`: Runs server using nodemon for auto updating

## Enviroment Variables
`DATABASE_URL`: Databse URI for postgress database
`DB_ENGINE`: Databse engine to use 'production' for deployment

## API Documentation

### EndPoints
#### User Route Endpoints:
- GET `/api/user/all`
- GET `/api/user/info/:id`
- PUT `/api/user/edit/:id`
- DELETE `/api/user/delete/:id`

#### Metrics Route Endpoints:
- GET `/api/progress/metrics/all`
- GET `/api/progress/metrics/get/:id`
- POST `/api/progress/metrics/create/:id`
- PUT `/api/progress/metrics/edit/:id`
- DELETE `/api/progress/metrics/delete/:id`

#### Category Route Endpoints:
- GET `/api/category/all`
- GET `/api/category/getbyuser/:id`
- POST `/api/category/create/:id`
- PUT `/api/category/edit/:id`
- DELETE `/api/category/delete/:id`

#### Workouts Route Endpoints:
- GET `/api/workouts/all`
- GET `/api/workouts/`
- POST `/api/workouts/`
- PUT `/api/workouts/edit/:id`

#### Schedule Workouts Route Endpoints:
- GET `/api/schedule/all`
- GET `/api/schedule/`
- POST `/api/schedule/create/:id`
- PUT `/api/schedule/edit/workout`


### User Routes

#### User Info

GET `/api/user/all`
- Gets a list of all users (testing purposes)
- Response is an array  with user objects

```
users : [
    {}, {},
] 
```

GET `/api/user/info/:id`
- Gets all the info of a single user with given id in req.params.
- Response is basic user object of Users table with all associated data.

Response:

```
{
  "id": 1,
  "name": 
  "email": 
  "phone": 
  "recieves_text": 
  "recieves_email": 
  "created_at": 
  "updated_at": 
  "metrics": [{ },{ }],
  "workouts": [
    {
      "exercises": [
        { },
        { },
        { }
      ],
      "category": { }
    }
  ],
  "scheduleWorkouts": [
    {
      "exercises": [
        { },
        { },
        { }
      ],
      "category": {  }
    }
  ]
}
```

PUT `/api/user/edit/52`

- Edits the user with given id in req.params
- Response includes an object with the updateduserCount of 1

Response:

```
{
  "updateduserCount": 1
}
```

DELETE `/api/user/delete/:id`

- Deletes the user with given id in req.params
- Response includes an object with the deleteduserCount of 1

Response:

```
{
  "deleteduserCount": 1
}
```


### Metrics Routes

#### Metrics Info

GET `/api/progress/metrics/all`

- Gets all the metrics for all users
- Response is an array which includes basic metrics objects

Response:

```
[
  {
    "id": 0,
    "created_at": "2019-01-10 17:13:09",
    "updated_at": "2019-01-10 17:13:09",
    "weight": 10.079924625003855,
    "hips": 3.355836598475216,
    "waist": 8.609838928827488,
    "arm_right": 6.5808771055066675,
    "arm_left": 7.311579244382037,
    "leg_right": 7.546573227382904,
    "leg_left": 9.951484413530151,
    "date": "2019-01-10 17:13:09",
    "user_id": 0
  },
  {
    "id": 1,
    "created_at": "2019-01-10 17:13:09",
    "updated_at": "2019-01-10 17:13:09",
    "weight": 5.948854770374069,
    "hips": 8.213643664668455,
    "waist": 1.4806847756526245,
    "arm_right": 7.022097727831248,
    "arm_left": 2.635112317202456,
    "leg_right": 2.611580422143979,
    "leg_left": 1.8865857463905291,
    "date": "2019-01-10 17:13:09",
    "user_id": 1
  }
]
```
GET `/api/progress/metrics/get/:id`

- Gets the metrics of the given user id in req.params
- Response is an array of all metrics objects that match the user ID

Response:

```
[
  {
    "id": 1,
    "created_at": "2019-01-10 17:13:09",
    "updated_at": "2019-01-10 17:13:09",
    "weight": 5.948854770374069,
    "hips": 8.213643664668455,
    "waist": 1.4806847756526245,
    "arm_right": 7.022097727831248,
    "arm_left": 2.635112317202456,
    "leg_right": 2.611580422143979,
    "leg_left": 1.8865857463905291,
    "date": "2019-01-10 17:13:09",
    "user_id": 1
  },
  {
    "id": 54,
    "created_at": "2019-01-10 18:57:52",
    "updated_at": "2019-01-10 18:57:52",
    "weight": 200,
    "hips": 33,
    "waist": 33,
    "arm_right": 22,
    "arm_left": 22,
    "leg_right": 22,
    "leg_left": 22,
    "date": "2019-01-10 18:57:52",
    "user_id": 1
  }
]
```
POST `/api/progress/metrics/create/:id`

- Creates a metric object for the given user id in req.params
- Response is the created metric object

Response:

```
{
  "weight": 220,
  "hips": 33,
  "waist": 33,
  "arm_right": 22,
  "arm_left": 22,
  "leg_right": 22,
  "leg_left": 22,
  "user_id": 1
}
```
PUT `/api/progress/metrics/edit/:id`

- Edits the metric with the given metric id in req.params
- Response is an object with updated user count of 1

```
{
  "updateduserCount": 1
}
```

DELETE `/api/progress/metrics/delete/:id`

- Deletes the metric with given metric id in req.params
- Response includes an object with the deleteMetricData of 1

Response:

```
{
  "deleteMetricData": 1
}
```


### Category Routes

#### Category Info

GET `/api/category/all`

- gets all categories
- Response is an array of category objects

Response:

```
[
  {
    "id": 0,
    "name": "Legs",
    "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62"
  }
]
```

GET `/api/category/getbyuser/:id`

- gets category by user id given by req.params
- Response is an array of categories that match the user ID

Response:

```
[
  {
    "id": 0,
    "name": "Legs",
    "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62"
  }
]
```

POST `/api/category/create/:id`

- Creates a new category for a specifc user id given by req.params
- Response is the category Object that was just created

Response:

```
{
    "name": "New Category",
    "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62"
}
```

PUT `/api/category/edit/:id`

- Edits a single category for a specific category id given by req.params
- Response is the updated category object

Response:

```
{
    "name": "New Category2",
    "id": 1,
    "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62"
}

```

DELETE `/api/category/delete/:id`

- Deletes a certain category by category id given by req.params
- Response is a message that the category has been deleted

Response:

```
Category has been deleted
```


### ScheduledWorkouts Routes

#### ScheduledWorkouts Info

GET `/api/schedule/all`

- Retrieves all schedule workouts 
- Response is an array  of scheduled workout objects. 
 Response: 
```
[
  {
    "id": 0,
    "date": "2019-01-02",
    "completed": 0,
    "percentage": 70,
    "title": "New Name",
    "category_id": 0,
    "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62"
  }
]
```

GET `/api/schedule/`

- Returns workouts associated with user
- Response is the scheduled workout and the exercises assigned to it
- Also returns scheduled exercises for the corresponding scheduled workout

Response: 
```
{
  "id": 0,
  "date": "2019-01-02",
  "completed": 0,
  "percentage": 70,
  "title": "New Name",
  "category_id": 0,
  "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62",
  "exercises": [
    {
      "id": 0,
      "schedule_workout_id": 0,
      "name": "Deadlift",
      "weight": 315,
      "sets": 5,
      "reps": 5,
      "completed": 0
    },
    {
      "id": 1,
      "schedule_workout_id": 0,
      "name": "Squats",
      "weight": 275,
      "sets": 3,
      "reps": 8,
      "completed": 0
    },
    {
      "id": 2,
      "schedule_workout_id": 0,
      "name": "Lunges",
      "weight": 25,
      "sets": 3,
      "reps": 12,
      "completed": 0
    }
  ]
}
```

POST `/api/schedule/create/:id`

- Creates a new scheduled workout
- Response is the newly created scheduled workout

```
{
  "id": 1,
  "date": "2019-12-12",
  "completed": 0,
  "percentage": 0,
  "title": "Chest Day #1",
  "category_id": 0,
  "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62",
  "exercises": []
}
```

PUT `/api/schedule/edit/exercise`

- Edits the scheduled exercise 
- Response is the newly-edited scheduled exercise

```
{
  "id": 1,
  "schedule_workout_id": 0,
  "name": "Stand still for a while",
  "weight": 275,
  "sets": 3,
  "reps": 8,
  "completed": 0
}
 ```

Put `/api/schedule/edit/workout`

- Edits the selected scheduled workout
- Response is the newly edited schedules workout

``` 
{
  "id": 1,
  "date": "2019-12-12",
  "completed": 0,
  "percentage": 0,
  "title": "Chest Day #1",
  "category_id": 0,
  "user_id": "w5iY6dJDISWE17ZbaO72QZWLTi62"
}
```

