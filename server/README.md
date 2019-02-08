# FLEXLOG

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
<!-- - [DELETE `/api/user/delete`](#delete-user) -->

#### [Metrics Route Endpoints](#metrics-routes)

- [GET `/api/progress/metrics/all`](#get-all-metrics)
- [GET `/api/progress/metrics/get`](#get-metrics-info)
- [POST `/api/progress/metrics/create`](#create-metrics-info)
- [PUT `/api/progress/metrics/edit`](#edit-metrics-info)
- [DELETE `/api/progress/metrics/delete/:id`](#delete-metrics-info)

#### [Category Route Endpoints](#category-routes)

- [GET `/api/category/all`](#get-all-categories)
- [GET `/api/category/user`](#get-category-info)
- [POST `/api/category/create`](#create-category)
- [PUT `/api/category/edit/:id`](#edit-category)
<!-- - [DELETE `/api/category/delete/:id`](#delete-category) -->

#### [Workouts Route Endpoints](#workouts-routes)

- [GET `/api/workouts/all`](#get-all-workouts)
- [GET `/api/workouts/`](#get-all-workouts-by-user-id)
- [POST `/api/workouts/`](#create-new-workout)
- [PUT `/api/workouts/edit/:id`](#edit-workout)

#### [Schedule Workouts Route Endpoints](#scheduledWorkouts-routes)

- [GET `/api/schedule/all`](#get-all-schedule-workouts)
- [GET `/api/schedule/`](#get-schedule-workout)
- [POST `/api/schedule/create/`](#create-schedule-workout)
- [PUT `/api/schedule/edit/workout/:id`](#edit-schedule-workout)
- [PUT `/api/schedule/edit/excercise/:id`](#edit-schedule-workout-exercise)

### User Routes

#### Get All Users

GET `/api/user/all`

- Gets a list of all users and user settings (testing purposes)
- Response is an array of user Objects

```
users : [
    {
    "id": 2,
    "uid": "MUiqaWxf0nN8ZE81yueX2KyscTC2",
    "name": "Test",
    "email": "Test@test.test",
    "phone": null,
    "recieves_text": false,
    "recieves_email": false,
    "created_at": "2019-01-31T21:08:52.910Z",
    "updated_at": "2019-01-31T21:08:52.910Z",
    "premium": false
  }, 
  {},
  {}
]
```
---
#### Get User Details

GET `/api/user`

- Gets all the info of a single user based on UID which is taken from firebase authorization.
- Response is user object with all associated data from all referenced tables.

Response:

```
{
  "id": 2,
  "uid": "USQMQyOiOfgaL7x3duJdlIHyz6K2",
  "name": "j",
  "email": "j@j.com",
  "phone": null,
  "recieves_text": false,
  "recieves_email": false,
  "created_at": "2019-02-05T21:52:48.309Z",
  "updated_at": "2019-02-05T21:52:48.309Z",
  "premium": false,
  "metrics": [{}],
  "category": [{}],
  "workouts": [{}],
  "scheduleWorkouts": [{}]
}
```
---
#### Edit User Details

PUT `/api/user/edit`

- Edits the info of a single user based on UID which is taken from firebase authorization
- Response is the newly edited user Object with all data from users table. 

Response:

```
{
  "id": 1,
  "uid": "w5iY6dJDISWE17ZbaO72QZWLTi62",
  "name": "edited elvis",
  "email": "test@test.com",
  "phone": null,
  "recieves_text": true,
  "recieves_email": false,
  "created_at": "2019-01-31T18:44:18.107Z",
  "updated_at": "2019-01-31T18:44:18.107Z",
  "premium": false
}
```

<!-- #### Delete User

DELETE `/api/user/delete`

- Deletes a single user based on UID which is taken from firebase authorization.
- Response is  -->
---
---
### Metrics Routes

#### Get All Metrics

GET `/api/progress/metrics/all`

- Gets all the metrics for all users
- Response is an array which includes basic metrics objects

Response:

```
[
  {
    "id": 1,
    "weight": "185.00",
    "hips": "3.36",
    "waist": "2.03",
    "arm_right": "10.68",
    "arm_left": "8.44",
    "leg_right": "9.31",
    "leg_left": "10.46",
    "date": "2019-01-16T00:00:00.000Z",
    "user_id": "1"
  }
]
```
---
#### Get Metrics Info

GET `/api/progress/metrics/get/`

- Gets the metrics of the given user based on ID from the user's table, which is taken from firebase authorization.
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
---
#### Create Metrics Info

POST `/api/progress/metrics/create`

- Creates a metric object for the given user based on ID from the user's table, which is taken from firebase authorization.
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
  "date": "12-12-2019",
  "user_id": 1
}
```
---
#### Edit Metrics Info

PUT `/api/progress/metrics/edit/:id`

- Edits the metric with the given metric id in req.params
- Response is an object with updated user count of 1

```
{
  "updateduserCount": 1
}
```
---
#### Delete Metrics Info

DELETE `/api/progress/metrics/delete/:id`

- Deletes the metric with given metric id in req.params
- Response includes an object with the deleteMetricData of 1

Response:

```
{
  "deleteMetricData": 1
}
```
---
---
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
---
#### Get Category by User

GET `/api/category/user`

- gets categories  based on ID from the user's table, which is taken from firebase authorization.
- Response is an array of categories that match the user ID.

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
---
#### Create Category

POST `/api/category/create/`

- Creates a new category for a specifc user based on ID from the user's table, which is taken from firebase authorization.
- Response is the category Object that was just created.

Response:

```
{
    "name": "New Category",
    "user_id": 1
}
```
---
#### Edit Category

PUT `/api/category/edit/:id`

- Edits a single category for a specific category id given by req.params
- Response is the updated category object

Response:

```
{
    "name": "New Category2",
    "id": 1,
    "user_id": "1"
}

```

<!-- #### Delete Category

DELETE `/api/category/delete/:id`

- Deletes a certain category by category id given by req.params
- Response is a message that the category has been deleted

Response:

```
Category has been deleted
``` -->
---
---
### Workouts Routes

#### Get All Workouts

GET `/api/workouts/all`

- gets all workouts for all users
- Response is an array of workout Objects

```
[
  {
    "id": 1,
    "user_id": "1",
    "category_id": 1,
    "title": "Deadlift Day #55",
    "exercises": [],
    "category": {}
  },
  { }
]
```
---
#### Get All Workouts by User ID

GET `/api/workouts`

- gets all workouts for a given user based on ID from the user's table, which is taken from firebase authorization.
- Response is an array of workout Objects that match the user ID.

```
[
  {
    "id": 1,
    "user_id": "1",
    "category_id": 1,
    "title": "Deadlift Day #55",
    "exercises": [],
    "category": {}
  },
  { }
]
```
---
#### Create New Workout

POST `/api/workouts`

- Creates new workout for given user based on user ID
- Response is the created workout object.

```
{
  "title": "Foot Day",
  "category_id": 1,
  "user_id": 1
}
```

---
#### Edit Workout

POST `/api/workouts/edit/:id`

- Edits workout based on workout ID passed from req.params
- Response is the edited workout.

```
{
  "title": "Foot Day",
  "category_id": 1,
  "user_id": 1
}
```
---
#### Delete Workout

POST `/api/workouts/delete/:id`

- Deletes given based on workout ID passed from req.params
- Response is object with deleteWorkoutData count of 1.

```
{
  "deleteWorkoutData": 1
}
```
---
---
### ScheduledWorkouts Routes

#### Get All Schedule Workouts

GET `/api/schedule/all`

- Retrieves all schedule workouts
- Response is an array of scheduled workout objects.
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
---
#### Get Schedule Workouts

GET `/api/schedule/`

- Returns scheduled workouts associated with user
- Response is the scheduled workout and the exercises assigned to it

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
---
#### Create Schedule Workout

POST `/api/schedule/create/`

- Creates a copy of a workout given by the workout_id, and adds it to the scheduled workouts table
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
---
#### Edit Schedule Workout

PUT `/api/schedule/edit/workout/:id`

- Edits the selected scheduled workout based on the id given in req.params
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
---
#### Delete Scheduled Workout

Put `/api/schedule/delete/workout/:id`

- Deletes the selected scheduled workout based on the id given in req.params
- Response is an object with deleteScheduleWorkout count of 1

```
{
  "deleteScheduleWorkout": 1
}
```

---
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
