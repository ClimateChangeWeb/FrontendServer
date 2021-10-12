# Climate change Frontend server

<p align="center">
    <a href="https://github.com/ClimateChangeWeb/FrontendServer/graphs/contributors" alt="Contributors">
        <img src="https://img.shields.io/github/contributors/ClimateChangeWeb/FrontendServer" /></a>

   <a href="https://github.com/ClimateChangeWeb/FrontendServer/issues" alt="Issues">
        <img src="https://img.shields.io/github/issues/ClimateChangeWeb/FrontendServer" /></a>

  <a href="https://github.com/ClimateChangeWeb/FrontendServer/blob/master/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/ClimateChangeWeb/FrontendServer" /></a>
  
  <a href="https://github.com/ClimateChangeWeb/FrontendServer/actions/workflows/dockerDeploy.yml" alt="License">
        <img src= "https://github.com/ClimateChangeWeb/FrontendServer/actions/workflows/dockerDeploy.yml/badge.svg"/></a>
  
  <a href= "https://github.com/ClimateChangeWeb/FrontendServer/actions/workflows/unitTesting.yml" alt="License">
        <img src= "https://github.com/ClimateChangeWeb/FrontendServer/actions/workflows/unitTesting.yml/badge.svg"/></a>
  
</p>

# Introduction

This is the front end for the Climate Changes web application. Through here, you can learn about how Climate Change is affecting our planet and find out more about the charities and organizations that work to curb its influence. The Discover page holds a large amount of information including the current climate news, the daily weather warnings for Australia, and a weather forecast.

# Installation

The application should run with no further setup required if deployed on IBM cloud. On the other hand the Docker image must have a specified port to run once downloaded e.g. 3000.

Please define the database ([mongodb](https://www.mongodb.com/)) URL and set the admin account&password. You can use a .env file for testing and in ibm cloud you can find the env variables setting in cloud foundry. For example:

```
MONGODB_URI=mongodb://mongodb0.example.com:27017
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=password
```

You can also copy the file `.envExample` using command:

```bash
cp .envExample .env
```

Then you can running the server using:

```bash
# install the dependencies
npm i

# running the server
npm start
```

# Admin Portal

The admin portal use [adminbro](https://adminbro.com/) an admin portal service built on React providing CRUD functionality by utilizing Mongoose and MongoDB. To integrate collections into the admin portal create a Mongoose Schema for that collection in the Models directory and then require it in the `adminRouter.js`.

Admin bro was used as it provides a very quick and simple CRUD functionality when hooked up with Mongoose and is secure by utilizing sessions. Passport was looked at initially although we had issues with other members meeting deadlines so the team needed to implement as quickly and efficiently as possible.

# Deployment

## IBM cloud

a CI/CD has been established to deploy the application to IBM Cloud whenever pushes are made to the Master Branch, to make changes to the deployment the manifest.yml can be edited to increase memory and other feature. To change factors such as the CI/CD the project owner may do so on the IBM Cloud console.
The user can also deploy changes manually if necessary by using the IBM CLI. The deployment can be found here: [Deployed service on IBM cloud](https://climate-change-frontend.us-south.cf.appdomain.cloud/)

## Docker hub

Github Actions are also being utilised to deploy a docker image of the application to dockerhub, this image can be found here: [docker hub image](https://hub.docker.com/r/ergourrrr/climate-change-frontend). While the Docker Image is not deployed to add in realtime support you must run it on local and run a local instance of the realtime service with the address pointing to the localhost port the docker image is running on

# Testing

automated testing is implemented with [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/) unit tests and is mainly used to test API endpoints and the verify data passed through the microservices created for this application. Tests can be implemented by running

```
npm test
```

The test file is located in `./test/test.js`.

# Logging

Logging is achieved via [morgan](https://github.com/expressjs/morgan) and returns information such as response time for all calls made in the application, the results are logged into the applications server.log file and also within the servers console.

# Services and APIs

- [Frontend server](https://climate-change-frontend.us-south.cf.appdomain.cloud/)
- [Backend server](https://climate-change-backend.us-south.cf.appdomain.cloud/)
- [IBM AI server](https://ibm-ai.us-south.cf.appdomain.cloud/)
- [Get all discover news data](https://us-south.functions.appdomain.cloud/api/v1/web/21aa5286-66d7-41a8-b547-3e067029a6bc/default/getDicoverNews)
- [Get all charities information data](https://us-south.functions.appdomain.cloud/api/v1/web/21aa5286-66d7-41a8-b547-3e067029a6bc/default/getCharities)

# References

[materializecss](https://materializecss.com/)

[IBM Cloud](https://www.ibm.com/cloud)

[adminbro](https://adminbro.com/)

[mongodb](https://www.mongodb.com/)

[morgan](https://github.com/expressjs/morgan)

[Docker Hub](https://hub.docker.com/)

[Australia climate warning data](http://www.bom.gov.au/rss/?ref=ftr)

[openWeather api](https://openweathermap.org/api)

[mocha](https://mochajs.org/)

[chai](https://www.chaijs.com/)

# License

Licensed under [Apache License 2.0](https://github.com/ClimateChangeWeb/FrontendServer/blob/master/LICENSE)

# Contribution

See [contributors page](https://github.com/ClimateChangeWeb/FrontendServer/graphs/contributors)
