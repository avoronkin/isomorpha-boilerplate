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
var routeManager = require('../shared/routeManager');
var authentication = require('./authentication/app');

var app = express();

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '../../../dist'));

app.use(logger('combined'));
app.use(favicon(path.resolve(__dirname, '../../../dist/public/favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../../../dist/public')));

app.use(reactMiddleware(settings.reactMiddleware));
app.use(authentication.app);
app.use('/api', apiApp);

app.use(function (req, res, next) {
    // res.locals.data = res.locals.data || [];
    var user = req.session.passport.user || {};
    user.role_id = 'user';
    res.locals.user = user;
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.helpers = require('../shared/helpers').helpers;
    next();
});

expressAdapter(routeTable, routeManager);

routeManager.applyRoutes(app);

app.use(errorHandler());
app.listen(3000);
