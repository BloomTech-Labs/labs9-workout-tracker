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
`FIREBASE_CLIENT_EMAIL`: Firebase client email necessary to initialize firebase app
`FIREBASE_PRIVATE_KEY`: Firebase private key necessary to initialize firebase app

## API Documentation

### EndPoints
#### [User Route Endpoints](#user-routes)
- [GET `/api/user/all`](#get-all-users)
- [GET `/api/user/info`](#get-user-details)
- [PUT `/api/user/edit`](#edit-user-details)
- [DELETE `/api/user/delete`](#delete-user)

#### [Metrics Route Endpoints](#metrics-routes)
- [GET `/api/progress/metrics/all`](#get-all-metrics)
- [GET `/api/progress/metrics/get`](#get-metrics-info)
- [POST `/api/progress/metrics/create`](#create-metrics-info)
- [PUT `/api/progress/metrics/edit`](#edit-metrics-info)
- DELETE `/api/progress/metrics/delete/:id`

#### [Category Route Endpoints](#category-routes)
- [GET `/api/category/all`](#get-all-categories)
- [GET `/api/category/getbyuser/:id`](#get-category-info)
- [POST `/api/category/create/:id`](#create-category)
- [PUT `/api/category/edit/:id`](#edit-category)
- [DELETE `/api/category/delete/:id`](#delete-category)

#### Workouts Route Endpoints:
- GET `/api/workouts/all`
- GET `/api/workouts/`
- POST `/api/workouts/`
- PUT `/api/workouts/edit/:id`

#### [Schedule Workouts Route Endpoints](#scheduledWorkouts-routes)
- [GET `/api/schedule/all`](#get-all-schedule-workouts)
- [GET `/api/schedule/`](#get-schedule-workout)
- [POST `/api/schedule/create/:id`](#create-schedule-workout)
- [PUT `/api/schedule/edit/workout/:id`](#edit-schedule-workout)
- [PUT `/api/schedule/edit/excercise/:id`](#edit-schedule-workout-exercise)


### User Routes

#### Get All Users

GET `/api/user/all`
- Gets a list of all users (testing purposes)
- Response is an array  with user objects

```
users : [
    {}, {},
] 
```

#### Get User Details

GET `/api/user`
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

#### Edit User Details

PUT `/api/user/edit`

- Edits the user with given id in req.params
- Response includes an object with the updateduserCount of 1

Response:

```
{
  "updateduserCount": 1
}
```

#### Delete User

DELETE `/api/user/delete`

- Deletes the user with given id in req.params
- Response includes an object with the deleteduserCount of 1

Response:

```
{
  "deleteduserCount": 1
}
```


### Metrics Routes

#### Get All Metrics

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
#### Get Metrics Info

GET `/api/progress/metrics/get/`

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

#### Create Metrics Info

POST `/api/progress/metrics/create`

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

#### Edit Metrics Info

PUT `/api/progress/metrics/edit`

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

#### Get All Categories

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

#### Get Category Info

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

#### Create Category

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

#### Edit Category

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

#### Delete Category

DELETE `/api/category/delete/:id`

- Deletes a certain category by category id given by req.params
- Response is a message that the category has been deleted

Response:

```
Category has been deleted
```


### ScheduledWorkouts Routes

#### Get All Schedule Workouts

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

#### Get Schedule Workouts

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

#### Create Schedule Workout

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


#### Edit Schedule Workout

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

#### Edit Schedule Workout Exercise

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

