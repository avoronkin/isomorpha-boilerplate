var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var testController = require('./controllers/test');

app.use(bodyParser());

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/test', testController.list);
app.post('/test', testController.create);

module.exports = app
