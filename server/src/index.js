// init project
var express = require("express");
var Sequelize = require("sequelize");
var app = express();
var bodyParser = require("body-parser");

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
