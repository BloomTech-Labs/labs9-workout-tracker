# Workout Tracker

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
  "id": 0,
  "name": "Filiberto Altenwerth",
  "email": "Kyleigh.Kassulke68@gmail.com",
  "phone": "467-472-9061",
  "recieves_text": 0,
  "recieves_email": 0,
  "created_at": "2019-01-08 21:14:07",
  "updated_at": "2019-01-08 21:14:07"
}
```

POST `/api/user/`

Creates a new user by id passed by an id parameter

Response includes basic user object of Users table

Response:

```
{
  "id": 0,
  "name": "Filiberto Altenwerth",
  "email": "Kyleigh.Kassulke68@gmail.com",
  "phone": "467-472-9061",
  "recieves_text": 0,
  "recieves_email": 0,
  "created_at": "2019-01-08 21:14:07",
  "updated_at": "2019-01-08 21:14:07"
}
```

