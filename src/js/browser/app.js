var page = require('page');
var pagejsAdapter = require('isomorpha-pagejs-adapter');
var reactMiddleware = require('isomorpha-reactjs-middleware');
var settings = require('../shared/settings');
var routeTable = require('../shared/routeTable');
var mediator = require('../shared/mediator');
var routeManager = require('../shared/routeManager');

page(function(req, res, next){
    req.isAuthenticated = function(){
        return !!(sharedData.user && sharedData.user.id);
    }
    res.locals = {};
    res.locals.user = sharedData.user;

    res.locals.isAuthenticated = req.isAuthenticated();

    res.redirect = function(path){
        page.show(path); 
    }
    next();
});

mediator.on('redirect', page.bind(this));

page(reactMiddleware(settings.reactMiddleware));

pagejsAdapter(routeTable, routeManager);

routeManager.applyRoutes(page);

window.onload = function () {
     page();
}
