const express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./app/routes/userRoutes'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  path = require('path'),
  passport = require('passport'),
  // swaggerUi = require('swagger-ui-express'),
  // YAML = require('yamljs'),
  dBConfig = require('./utils/dbConfig');
// swaggerDocument = YAML.load('./swagger.yaml');


mongoose
  .connect(
    dBConfig.database,
    { useNewUrlParser: true}
  )
  .then(() => {
    console.log('successfully connected to the database');
  })
  .catch(() => {
    console.log('unable to connect to the database  Exiting now..');
    process.exit();
  });
  mongoose.set('useCreateIndex', true);

const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

require('./utils/auth/passport')(passport);
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

const port = dBConfig.port || 3005;

const server = app.listen(port, function() {
  console.log('app running on', server.address().port);
});
module.exports = server;