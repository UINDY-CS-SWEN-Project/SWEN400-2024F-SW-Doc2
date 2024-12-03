Web: ReactJS + Nginx + Flask + MySQL
A docker container environment for ReactJS, Nginx, Flask, and MySQL
Docker environment
Backend: Flask Backend-Storage: MySQL Proxy: Nginx Frontend: ReactJS
Features Implemented:
User can create an account
The webtool requires a user login
The webtool saves users, teams, and documents
User can create, view, and manage teams
User can add and remove members from teams
User can give team members edit privilege
User can create and edit documents
User can make and apply templates for documents
User can view documents
Libraries Used:
Selenium
CKEditor
Data Formats:
.pkl
Data Format Example:
[{'teamName': '2', 'MembsUserName': ['1', '2', '3'], 'MembsPermiss': [True, False, False]}, {'teamName': '1', 'MembsUserName': ['1'], 'MembsPermiss': [True]}, {'teamName': 'Team1', 'MembsUserName': ['AAA'], 'MembsPermiss': [True]}]
Project structure:
.
├── clean-all.sh
├── clean-start.sh
├── compose.yaml
├── flask
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app
│       ├── saveTemplate.pl
│       ├── saveTest.pkl
│       ├── server.py
│       ├── team_data.pkl
|       └── user_data.pkl
├── mysql
│   ├── Dockerfile
│   └── init.sql
├── nginx
│   ├── nginx.conf
│   ├── Dockerfile
│   └── shtml
│       └── index.html
├── react
│   ├── Dockerfile
│   ├── package.json
│   └── client-app
│       ├──public
│           ├── favicon.ico
│           ├── index.html
│           ├── logo192.png
│           ├── logo512.png
│           ├── manifest.json
│           └── robots.txt
│       ├── src
│           ├── App.css
│           ├── App.js
│           ├── index.css
│           ├── index.js
│           ├── logo.svg
│           ├── reportWebVitals.js
│           ├── setUpTests.js
│           ├── pages
│               ├── Editor.css
│               ├── Editor.jsx
│               ├── EditTeam.js
│               ├── Home.css
│               ├── Home.js
│               ├── Login.css
│               ├── Login.js
│               ├── Registration.js
│               ├── RegistrationForm.css
│               ├── Teams.css
│               ├── Teams.js
│           └── utils
│               ├── PrivateRoutes.js

The compose file defines an application with three services web, backend and db. When deploying the application, docker compose maps port 80 of the web service container to port 80 of the host as specified in the file. Make sure port 80 on the host is not being used by another container, otherwise the port should be changed.
Deploy with docker compose$ docker compose up -d
Creating network "nginx-flask-mongo_default" with the default driver
Pulling mongo (mongo:)...
latest: Pulling from library/mongo
423ae2b273f4: Pull complete
...
...
Status: Downloaded newer image for nginx:latest
Creating nginx-flask-mongo_mongo_1 ... done
Creating nginx-flask-mongo_backend_1 ... done
Creating nginx-flask-mongo_web_1     ... done

Expected result
After the application starts, navigate to http://localhost:8080
Stop and remove the containers
$ docker compose down
Using the application:
Create an account or login to an already existing account, this will navigate you to the homepage where everything can be accessed