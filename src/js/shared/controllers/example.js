var isClient = (typeof window != "undefined");
var Example = require('../models/Example');
var _ = require('lodash');
var array = require('array');

if (!isClient) {
    var nodeJsx = require('node-jsx');
    nodeJsx.install({
        extension: '.jsx'
    });
}

var listComponent = require('../components/example.jsx').list;
var editComponent = require('../components/example.jsx').edit;
var createComponent = require('../components/example.jsx').create;
var showComponent = require('../components/example.jsx').show;

module.exports.show = function (req, res, next) {
    var id = req.params.id;
    console.log('show example handler', id);

    if (isClient && req.firstRender) {
        console.log('first render on client', sharedData)
        res.renderComponent(showTestComponent, sharedData);
    } else {
        Example.get(id, function (err, model) {
            res.renderComponent(showComponent, {
                item: model.toJSON()
            });
        });
    }
}

module.exports.edit = function (req, res, next) {
    var id = req.params.id;
    console.log('edit example handler', id);

    if (isClient && req.firstRender) {
        sharedData.item = new Example(sharedData.item);
        res.renderComponent(editComponent, sharedData);
    } else {
        Example.get(id, function (err, model) {
            res.renderComponent(editComponent, {
                item: model
            });
        });
    }
}

module.exports.create = function (req, res, next) {
    console.log('create example handler');
    res.renderComponent(editComponent, {
        item: new Example
    });

}


module.exports.list = function (req, res, next) {
    console.log('example list handler');

    if (isClient && req.firstRender) {
        res.renderComponent(listComponent, sharedData);
    } else {
        Example.all(function (err, models) {
            // var collection = array(models);
            res.renderComponent(listComponent, {
                data: _.invoke(models, 'toJSON')
            });
        });
    }
}
