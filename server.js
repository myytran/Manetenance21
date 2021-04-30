'use strict';

const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//Passport config
require('./config/passport')(passport);
//DB config
const db = require('./config/database').MongoURI;
//CONNECT TO mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected..'))
  .catch((err) => console.log(err));
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//launch
app.listen(port);
console.log('The magic happens on port ' + port);
