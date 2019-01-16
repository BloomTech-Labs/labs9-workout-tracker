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


