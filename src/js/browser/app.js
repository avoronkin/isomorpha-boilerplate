var page = require('page');
var pagejsAdapter = require('isomorpha-pagejs-adapter');
var reactMiddleware = require('isomorpha-reactjs-middleware');
var settings = require('../shared/settings');
var routeTable = require('../shared/routeTable');
var mediator = require('../shared/mediator');

var RouteManager = require('express-shared-routes').PagejsRouteManager;
var routes = new RouteManager();

page(function(req, res, next){
    res.locals = {};
    res.locals.getLink = routes.getLink.bind(routes);

    res.redirect = function(path){
        page.show(path); 
    }
    next();
})

mediator.on('redirect', page.bind(this));

page('*', reactMiddleware(settings.reactMiddleware));

pagejsAdapter(routeTable, routes);


routes.applyRoutes(page);
window.onload = function () {
     page();
}
