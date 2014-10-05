var _ = require('lodash');
var routeHelpers = require('./route');


module.exports = {
    helpers:  _.extend({}, routeHelpers)
};
