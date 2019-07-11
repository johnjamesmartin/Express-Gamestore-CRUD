/* Dependencies
 *****************************************/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
app.use(flash());

const User = mongoose.model(
  'User',
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
  })
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy((username, password, done) => {
    console.log('GOT TO PASSPORT LOCAL STR');
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { msg: 'Incorrect username' });
      }
      if (user.password !== password) {
        return done(null, false, { msg: 'Incorrect password' });
      }
      return done(null, user);
    });
  })
);

//
passport.serializeUser(function(user, done) {
  console.log('GOT TO SERIALIZE USER');
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log('GOT TO DESERIALIZE USER');
    console.log(user);
    done(err, user);
  });
});

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// views here

/* Routes
 *****************************************/
// GET homepage — public route
app.get('/', (req, res) => {
  res.redirect('/catalog');
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up', {});
});

app.post('/sign-up', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  }).save(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// move to own file
app.get('/sign-up', (req, res) => res.render('sign-up-form'));

app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })
);

app.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

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
