"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const passport = require("passport");

//set up our express application
app.use(express.static("public"));

//register view engine
app.set("view engine", "ejs");

//launch
app.listen(port);
console.log("The magic happens on port " + port);
