var isClient = (typeof window != "undefined");
var Example = require('../models/Example');
var _ = require('lodash');
var mediator = require('../mediator');
var acl = require('../acl');
var async = require('async');

if (!isClient) {
    var nodeJsx = require('node-jsx');
    nodeJsx.install({
        extension: '.jsx'
    });
}

var listComponent = require('../components/example.jsx').list;
var editComponent = require('../components/example.jsx').edit;
// var newComponent = require('../components/example.jsx').new;
var showComponent = require('../components/example.jsx').show;

module.exports.show = function (req, res, next) {
    var id = req.params.id;
    res.locals.title = 'Show controller';
    console.log('show example handler', id);
    if (isClient && req.firstRender) {
        console.log('first render on client', sharedData)
        sharedData.item = new Example(sharedData.item);
        res.renderComponent(showComponent, sharedData);
    } else {
        Example.get(id, function (err, model) {
            res.renderComponent(showComponent, {
                item: model
            });
        });
    }
}


module.exports.edit = function (req, res, next) {
    var id = req.params.id;

    res.locals.title = 'Edit controller';

    async.parallel([

            function (callback) {
                if (isClient && req.firstRender) {
                    sharedData.item = new Example(sharedData.item);
                    callback(null, sharedData);
                } else {
                    callback(null, null);
                }
            },

            function (callback) {
                if (!isClient || !req.firstRender) {
                    Example.get(id, function (err, model) {
                        var data = {
                            item: model
                        };
                        callback(null, data);
                    });
                } else {
                    callback(null, null);
                }
            }

        ],

        function (err, results) {
            var data = results[0] || results[1];
            async.parallel({
                    canEdit: function (callback) {
                        acl.query(res.locals.user, data.item , 'edit', function (err, allowed) {
                            if (err) {
                                callback(err, null);
                            }else{
                                callback(null, allowed);
                            }
                        });
                    }
                },
                function (err, results) {
                    data = _.extend(data, results);
                    res.renderComponent(editComponent, data);
                });
        });
}


module.exports.new = function (req, res, next) {
    res.locals.title = 'New controller';
    console.log('new example handler');
    res.renderComponent(editComponent, {
        item: new Example
    });
}


module.exports.list = function (req, res, next) {
    console.log('example list handler');

    res.locals.title = 'List controller';

    if (isClient && req.firstRender) {
        sharedData.data = _(sharedData.data).map(function (attr) {
            return new Example(attr);
        });
        res.renderComponent(listComponent, sharedData);
    } else {
        Example.all(function (err, models) {
            res.renderComponent(listComponent, {
                data: models
            });
        });
    }
}
