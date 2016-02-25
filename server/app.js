const path = require('path'),
      favicon = require('static-favicon'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      express = require('express');


var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api',require('./routes')());

app.use(express.static(path.join(__dirname, '..','client')));


module.exports = app;
