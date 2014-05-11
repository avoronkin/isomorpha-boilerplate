var routeTable = require('../shared/routeTable');
var pagejsAdapter = require('./pagejsAdapter');
var reactMiddleware = require('../shared/reactMiddleware');
var page = require('page');
var settings = require('../shared/settings');

page('*', reactMiddleware({rootElId: settings.rootElId}));
page('*', function(req, res, next){

    console.log('render something')
    next();
})
pagejsAdapter(routeTable, page);

window.onload = function(){
    console.log('window load');
    page();
}
