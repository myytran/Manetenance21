'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');

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

//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//launch
app.listen(port);
console.log('The magic happens on port ' + port);
