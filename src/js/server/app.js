var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var reactMiddleware = require('isomorpha-reactjs-middleware');
var logger = require('morgan')
var errorHandler = require('errorhandler');
var apiApp = require('./api/app');
var expressAdapter = require('isomorpha-expressjs-adapter');
var routeTable = require('../shared/routeTable');
var settings = require('../shared/settings');
var app = express();
var RouteManager = require('express-shared-routes').RouteManager;
var routes = new RouteManager();
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '../../../dist'));

app.use(reactMiddleware(settings.reactMiddleware));
app.use(logger());
app.use(favicon(path.resolve(__dirname, '../../../dist/public/favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../../../dist/public')));
app.use('/api', apiApp);

app.use(function(req, res, next){
    res.locals.getLink = routes.getLink.bind(routes);
    next();
})

expressAdapter(routeTable, routes);

app.use(errorHandler());

routes.applyRoutes(app);

app.listen(3000);
