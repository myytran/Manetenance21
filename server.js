'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');




app.use(express.static('public'));


//launch
app.listen(port);
console.log('The magic happens on port ' + port);

