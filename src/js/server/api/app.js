var express = require('express');
var Resource = require('express-resource');
var app = express();
var bodyParser = require('body-parser');
var Example = require('../../shared/models/Example');

app.use(bodyParser());

app.get('/', function(req, res){
  res.send('it\'s works!');
});

app.resource('examples', Example.middleware);

module.exports = app
