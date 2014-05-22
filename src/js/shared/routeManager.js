var isClient = require('is-browser');
var PagejsRouteManager = require('express-shared-routes').PagejsRouteManager;
var RouteManager = require('express-shared-routes').RouteManager;

var routeManager;

if (isClient) {
    routeManager = new PagejsRouteManager();
} else {
    routeManager = new RouteManager();
}

module.exports = routeManager;
