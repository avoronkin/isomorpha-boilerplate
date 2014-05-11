var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var expressAdapter = require('./expressjsAdapter');
var routeTable = require('../shared/routeTable');
var logger  = require('morgan')
var errorHandler = require('errorhandler');
var app = express();
var apiApp = require('./api/app');


app.use(logger());
app.use(favicon(path.resolve(__dirname, '../../../dist/public/favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../../../dist/public')));
app.use('/api', apiApp);
expressAdapter(routeTable, app);
app.use(errorHandler());

app.listen(3000);
