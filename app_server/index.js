const express = require('express'),
      path = require('path'),
      favicon = require('static-favicon'),
      logger = require('morgan'),
      bodyParser = require('body-parser');


const app = express();

require('./models');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api',require('./routes')());

app.use(express.static(path.join(__dirname, '..','static')));


module.exports = app;
