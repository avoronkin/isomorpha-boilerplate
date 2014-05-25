var modella = require('modella');
var validators = require('modella-validators');
var ajaxSync = require('modella-ajax');
var isBrowser = require('is-browser');
var _ = require('lodash');

var Model = modella('example');
Model.use(validators);
Model.use('browser', ajaxSync('/api/examples'))

if (!isBrowser) {
    var mongo = require('modella-mongo');
    var resource = require('modella-resource');
    Model.use('server', resource());
    Model.use('server', mongo('localhost/db'));
}

Model.attr('_id')
    .attr('title', {
        required: true
    })
    .attr('text', {
        required: true
    });

Model.prototype.getGroupedErrors = function () {
    return _.groupBy(this.errors, function (error) {
        return error.attr;
    });
}

Model.prototype.getResourceId = function(){
    return "todo";
}

module.exports = Model;
