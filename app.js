const express = require('express');
const bodyPaser = require('body-parser');
const path = require('path');
const cors = require('cors');
const figlet = require('figlet');
const chalk = require('chalk');
// Setting up the required packages for MongoDB
const mongoose = require('mongoose');

const { dbOptions, remoteConnectionString, localConnectionString } = require('./config/db.config');
const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const lessonsRouter = require('./routes/lessons');
const usersRouter = require('./routes/users');

const app = express();
// Setting up the port from the Environment Variable
const port = process.env.PORT || 1400;
const hostname = 'localhost';

 // Using MIDDLEWARE
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5000'
}));

// Using CUSTOM MIDDLEWARE
app.use('/assets', express.static(path.join(__dirname + '/public')));
app.use('/', function(req, res, next) {
  console.log({
    RequestUrl: req.url,
    RequestMethod: req.method,
    IsRequestSecure: req.secure,
    RequestIP: req.ip
  });
  next(); // this will run the method with the matching route once the middleware done the things it needs to do
});
app.use('/', indexRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/users', usersRouter);

app.get('/favicon.ico', function(req, res) {
  res.send('assets/favicon.ico');
});

/**
 * Connect to the DB first and after the connection is established
 * successfully then start the Node server.
 */
mongoose.connect(localConnectionString, dbOptions, (err) => {
  if (err) {
    console.log(chalk.red(`Unable to Connect to the server!`), err);
    process.exit(1);
  } else {
    // Start the APP once the DB is connected
    app.listen(port, hostname, () => {
      figlet('Welcome To Node Server', function(err, data) {
        if (err) {
          console.log('Something is wrong with Figlet.');
          return;
        }
        console.log(data);
      });
      console.log(chalk.green(`Server is up and running at http://${hostname}:${port}`));
    });
  }
});
