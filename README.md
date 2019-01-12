# fitmetrix

## Team
|   [**Elvis Ibarra**](https://github.com/ielvisd)  |   [**Joseph Stanfield**](https://github.com/CookieMonsta89)   |    [**Matt Wright**](https://github.com/mattwright42)    |   [**William DiFulvio**](https://github.com/Wdifulvio523)  |     [**Christopher Cedeno**](https://github.com/reynld)
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:|
| [<img src="https://avatars0.githubusercontent.com/u/27535087?s=80" width="80">](https://github.com/ielvisd) | [<img src="https://avatars3.githubusercontent.com/u/20689379?s=80" width="80">](https://github.com/CookieMonsta89)  | [<img src="https://avatars3.githubusercontent.com/u/41647189?s=80" width="80">](https://github.com/mattwright42) | [<img src="https://avatars3.githubusercontent.com/u/38021468?s=80" width="80">](https://github.com/Wdifulvio523) | [<img src="https://avatars2.githubusercontent.com/u/29667816?s=80" width="80">](https://github.com/reynld) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ielvisd)  |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/CookieMonsta89) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/mattwright42)  | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/Wdifulvio523) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/reynld) |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/ielvis/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/joseph-stanfield-4a83a757/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/matthew-wright-945472a1/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/william-difulvio) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/reynld/) |

File Structure:
- Major component folders are organized based on Page View (Landing Page, Progress Page, Schedule Page, Workout Page).
- Where applicable, lists and list items are contained in folders inside of the component that they relate to.

# Deployment

## Scripts
`postinstall`: script that gets ran after repo gets installed on heroku. 

Used to install dependencies in child folders and knex as a global dependencies so knex migrations and seeds can be ran

`heroku-postbuild`: script that runs after project gets build on heroku

Used to run knex migrations and seeds for postgress database

## Procfile

Specifies the commands that are executed by the app on startup for heroku deployment


# Frontend

## Photo Credits
Photos on the website taken from  - 
[Pexels](https://www.pexels.com/photo/barbell-on-the-floor-1552252/)
[Pexels](https://www.pexels.com/photo/man-carrying-barbel-791763/)
[Pexels](https://www.pexels.com/photo/rope-jumping-ropes-human-training-28080/)

Pexels License - Free for personal and commercial use; no attribution required.


# Backend

## Scripts
`npm run start`: Runs server once using node index.js
`npm run server`: Runs server using nodemon for auto updating

## Enviroment Variables
`DATABASE_URL`: Databse URI for postgress database
`DB_ENGINE`: Databse engine to use 'production' for deployment

## API Documentation

### User Routes

#### User Info
GET `/api/user/info/:id`

Gets all the info of user info by id passed by an id parameter

Response includes basic user object of Users table

Response:

```
{
  "id": 1,
  "name": "Adonis Windler",
  "email": "Lucinda.DuBuque@yahoo.com",
  "phone": "574.166.4961",
  "recieves_text": 0,
  "recieves_email": 0,
  "created_at": "2019-01-10 17:13:09",
  "updated_at": "2019-01-10 17:13:09",
  "metrics": [
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
  ],
  "workouts": [
    {
      "id": 1,
      "user_id": 1,
      "category_id": 1,
      "title": "Deadlift Day #1",
      "exercises": [
        {
          "id": 4,
          "workout_id": 1,
          "name": "Deadlift",
          "weight": 315,
          "sets": 5,
          "reps": 5
        },
        {
          "id": 5,
          "workout_id": 1,
          "name": "Squats",
          "weight": 275,
          "sets": 5,
          "reps": 5
        },
        {
          "id": 6,
          "workout_id": 1,
          "name": "Lunges",
          "weight": 25,
          "sets": 3,
          "reps": 24
        }
      ],
      "category": {
        "id": 1,
        "name": "Legs",
        "user_id": 1
      }
    }
  ],
  "scheduleWorkouts": [
    {
      "id": 2,
      "date": "2019-01-04",
      "completed": 0,
      "percentage": 0,
      "title": "Deadlift Day #1",
      "category_id": 1,
      "user_id": 1,
      "exercises": [
        {
          "id": 4,
          "schedule_workout_id": 2,
          "name": "Deadlift",
          "weight": 315,
          "sets": 5,
          "reps": 5,
          "completed": 0
        },
        {
          "id": 5,
          "schedule_workout_id": 2,
          "name": "Squats",
          "weight": 275,
          "sets": 5,
          "reps": 5,
          "completed": 0
        },
        {
          "id": 6,
          "schedule_workout_id": 2,
          "name": "Lunges",
          "weight": 25,
          "sets": 3,
          "reps": 24,
          "completed": 0
        }
      ],
      "category": {
        "id": 1,
        "name": "Legs",
        "user_id": 1
      }
    }
  ]
}
```
POST `/api/user/`


Gets the id of the posted user

Response includes an object with the user id 

Response:

```
[
  53
]
```

DELETE `/api/user/delete/:id`

Deletes the user with given id in req.params

Response includes an object with the deleteduserCount of 1

Response:

```
{
  "deleteduserCount": 1
}
```

PUT `/api/user/edit/52`

Edits the user with given id in req.params

Response includes an object with the updateduserCount of 1

Response:

```
{
  "updateduserCount": 1
}
```

### Metrics Routes

#### Metrics Info
GET `/api/progress/metrics/all`

Gets all the metrics for all users

Response includes basic metrics objects from metrics table

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

Gets the metrics of the given user id in req.params

Response includes an object with the user metrics

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

DELETE `/api/progress/metrics/delete/:id`

Deletes the metric with given metric id in req.params

Response includes an object with the deleteMetricData of 1

Response:

```
{
  "deleteMetricData": 1
}
```

POST `/api/progress/metrics/create/:id`

Adds a metric for the given user id in req.params

Response includes a metric object with the user id 

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
=======
Data Structure:
```
   user: {
          id: 1,
          name: "Elvis",
          email: "jlstan06@yahoo.com",
          phone: "859-598-8979",
          receives_text: true,
          recieves_email: false,
          created_at: "", 
          updated_at: '',
          metrics: [
            {
            id: 1,
            created_at: "", 
            updated_at: '',
            user_id: 1,
            dateLogged: "",
            weight: 2,
            hips: 2,
            waist: 2,
            arm_right: 2,
            arm_left: 2,
            leg_left: 2,
            leg_right: 2
          }
          ],
          workouts: [
            {
              id:1,
              title:'',
              user_id:1,
              category_id:1,
              exercises: [
                {
                  id: 1,
                  workout_id:1,
                  name: "",
                  sets: 2, 
                  reps: 2,
                  weight:2,
                }
              ],
              category: 
                {
                  id: 1,
                  user_id:1,
                  name: "",
                }
            }

          ],
          schedule_workouts: [
            {
              id:1,
              date: '',
              completed: false,
              percentage: 0,
              title:'',
              user_id:1,
              category_id:1,
              schedule_exercises: [
                {
                  id: 1,
                  schedule_workout_id: 1,
                  name: "",
                  sets: 2, 
                  reps: 2,
                  weight:2,
                  completed:false
                }
              ],
              category: 
                {
                  id: 1,
                  user_id:1,
                  name: "",
                }
            }

          ],
        }, 
      ]
    };```
