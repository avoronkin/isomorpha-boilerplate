var routeTable = require('../shared/routeTable');
var pagejsAdapter = require('./pagejsAdapter');

var page = require('page');
page('*', function(req, res, next){

    console.log('render something')
    next();
})
pagejsAdapter(routeTable, page);

page();
