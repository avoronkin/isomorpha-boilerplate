var page = require('page');
var pagejsAdapter = require('isomorpha-pagejs-adapter');
var reactMiddleware = require('isomorpha-reactjs-middleware');
var settings = require('../shared/settings');
var routeTable = require('../shared/routeTable');

page('*', reactMiddleware(settings.reactMiddleware));

pagejsAdapter(routeTable, page);

window.onload = function () {
    page();
}
