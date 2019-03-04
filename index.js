'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./app/routes");
const config = require("./config");
const passport = require("passport");
const databaseConfiguration = require("./config/dbConfig");

mongoose
  .connect(
    databaseConfiguration.database,
    { useNewUrlParser: true}
  )
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch(() => {
    console.log("unable to connect to the database  Exiting now..");
    process.exit();
  });
  mongoose.set('useCreateIndex', true);

// create express app
const app = express();
const cors = cors();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

const port = databaseConfiguration.port || 3005;

const server =  app.listen(port, ()=>{
    console.log(`App is running in port ${port}`);
});

module.exports = server;

