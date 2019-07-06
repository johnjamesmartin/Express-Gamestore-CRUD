/* Dependencies
 *****************************************/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const app = express();
const config = require('./config');

/* View engine setup
 *****************************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Middleware
 *****************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

/* 404 error handling:
 *****************************************/
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message; // Set locals w/ errors only in dev
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500); // Render error page
  res.render('error');
});

/* Connect to database:
 *****************************************/
const { username, password, cluster, params } = config.db; // config takes from .env
const mongoDB = `mongodb+srv://${username}:${password}@${cluster}/${params}`;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection
  .on('connected', () => {
    console.log('Connected to database');
  })
  .on('error', console.error.bind(console, 'Error connecting to database:'));

module.exports = app;
