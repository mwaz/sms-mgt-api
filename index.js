import dBConfig from './utils/dbConfig';
import passport from 'passport';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './app/routes';
import  bodyParser from 'body-parser';
import express from 'express';
import jsend from 'jsend'
import swaggerUi  from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load("./swagger.yaml");

const dbUri = 

mongoose
  .connect(
    dBConfig.database,
    { useNewUrlParser: true}
  )
  .then(() => {
    console.log('successfully connected to the database');
  })
  .catch((e) => {
    console.log('unable to connect to the database  Exiting now..');
    console.log(e, ' the error [][][][][[]][][][][][][][][][][][][][][][][][][] your output');
    // process.exit();
  });
  mongoose.set('useCreateIndex', true);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(bodyParser.json());
app.use(jsend.middleware);

// routes(app);
app.use('/sms-mgt/api', routes)

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