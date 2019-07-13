/*
Permission levels:
-------------------
  0 = Banned
  1 = Basic
  2 = Admin
  3 = Super
*/

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
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
//const { check } = require('express-validator');
const async = require('async');
const app = express();
const config = require('./config');

const expressValidator = require('express-validator');

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
app.use(expressValidator());

/* Passport local strategy
 *****************************************/
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { msg: 'Incorrect username' });
      bcrypt.compare(password, user.password, (err, res) => {
        res
          ? done(null, user)
          : done(null, false, { msg: 'Incorrect password' });
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(
  session({
    secret: config.passport.secret,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// GET homepage
// Permission: public
// Description: Display homepage (current "Catalog")
app.get('/', (req, res) => {
  res.redirect('/catalog');
});

// GET sign up form
// Permission: public
// Description: Display sign up form
app.get('/sign-up', (req, res) => {
  res.render('sign-up', {
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
  req.session.success = null;
});

// POST sign up form
// Permission: public
// Description: Display sign up page
app.post('/sign-up', (req, res, next) => {
  const { email, username, password, password2 } = req.body;
  req.session.errors = null;
  req.session.success = null;

  // Check email is valid and not in records
  req.check('email', 'Invalid email address').isEmail();
  req
    .check('email', 'Email already registered')
    .custom(() =>
      User.find({ email: email }).then(user => (user ? true : false))
    );

  // Check username is available
  req
    .check('username', 'Username taken')
    .custom(() =>
      User.find({ username: username }).then(user => (user ? true : false))
    );

  // Check password is valid and matches confirmation field
  req.check('password', 'Password invalid').isLength({ min: 8 });
  req
    .check('password2', 'Passwords do no match')
    .custom(() => (req.body.password === req.body.password2 ? true : false));

  const errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.redirect('/sign-up');
  } else {
    req.session.success = true;
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
        return; // return statement added
      } else {
        const user = new User({
          email,
          username,
          password: hashedPassword,
          accessLevel: 1
        }).save(err => {
          if (err) return next(err);
          res.redirect('/');
        });
      }
    });
  }
  //res.redirect('/sign-up');
});

// POST log in form
// Permission: public
// Description: Log in user
app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })
);

// GET logout
// Permission: public
// Description: Log out user
app.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

/* Routes
 *****************************************/
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

/* 404 error handling:
 *****************************************/
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message; // Set locals w/ errors only in dev
  res.locals.j = 'works';
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
