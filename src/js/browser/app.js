var routeTable = require('../shared/routeTable');
var pagejsAdapter = require('./pagejsAdapter');
var reactMiddleware = require('../shared/reactMiddleware');
var page = require('page');
var settings = require('../shared/settings');
var firstRender = true;

// page('*', function (req, res, next) {
//     if (firstRender) {
//         console.log('first render')
//     } else {
//         console.log('not first render');
//     }

//     next();
// })

page('*', reactMiddleware({
    rootElId: settings.rootElId,
    firstRender: true
}));

// page('*', function (req, res, next) {
//     firstRender = false;
//     next();
// })

pagejsAdapter(routeTable, page);

window.onload = function () {
    console.log('window load');
    page();
}
