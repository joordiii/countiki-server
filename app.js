'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const configurePassport = require('./helpers/passport');
const response = require('./helpers/response');

const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const event = require('./routes/event');

const app = express();

// -- database

const dbName = 'countikidb';

mongoose.Promise = Promise;
mongoose.Promise = Promise;
mongoose.connect(`mongodb://localhost/${dbName}`, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${dbName} database`);
});

// -- session

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'countiki-app',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// -- middlewares

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

// -- routes

app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);
app.use('/event', event);

// -- 404 and error handler

app.use(function (req, res, next) {
  response.notFound(req, res);
});

// NOTE: requires a views/error.ejs template
app.use(function (err, req, res, next) {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only send if the error ocurred before sending the response
  if (!res.headersSent) {
    response.unexpectedError(req, res, err);
  }
});

module.exports = app;
