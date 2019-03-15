## SMS Management API

A CRUD API app built on node, express, mongodb and Passport.


The Express JS framework handles the API CRUD, mongodb handles the DB storage while Moongoose is used as an Object Document Mapper (similar to an ORM in python). PassportJs handles authenitcation of users to the application using jwt helper library.

## Requirements

* NodeJS
* Mongo DB
* express framework
* Moongoose 
* Passport

## What the app does

The API enables a user to simulate the sending, receiving and deleting of text messages, adding contacts and deleting contacts. A user can only send text messages to contacts that they have added and once they delete those contacts any references to the messages they have sent them are erased. 

## Application setup 

SMS management API is hosted on heroku and you can access the [documentation here](https://sms-mgt-api.herokuapp.com/api-docs). Through the docs you can test out the endpoints and the functionnality of the API.

## Running the application locally 
1. clone the application from `git@github.com:mwaz/sms-mgt-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. Start the application `npm start`

## Running the test locally
1. clone the application from `git@github.com:mwaz/sms-mgt-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. run the tests using `npm test`

## Technologies
Technologies used in the application are Express, Node and MongoDB. In the next iteration, ReactJS will be used as the frontend with Google Cloud Platfrom working as the engine that will power the application. 

## Documentation 
The app is currently documented using swagger 2.0 and the Open API Specification as shown below . 

![Screen Shot 2019-03-15 at 08 20 01](https://user-images.githubusercontent.com/10160787/54410124-2ef42a80-46fb-11e9-8cfe-59ee2f9333ed.png)

