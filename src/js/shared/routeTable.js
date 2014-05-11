var fs = require('fs');
var path = require('path');
var testController = require('./controllers/test');
var isClient = (typeof window != "undefined");

if (!isClient) {
    var nodeJsx = require('node-jsx');
    nodeJsx.install({
        extension: '.jsx'
    });
}

var homeComponent = require('../shared/components/home.jsx');

module.exports = [{
        pattern: '/',
        name: 'home',
        handlers: [

            function (req, res) {

                res.renderComponent(homeComponent, {
                    name: (isClient ? 'client' : 'server')
                })
            }
        ]
    }, {
        pattern: '/test',
        name: 'test',
        handlers: testController.list
    }, {
        pattern: '*',
        name: '404',
        handlers: function (req, res, next) {
            console.log('404 handler');

            if (!isClient) {
                res.send('error 404')
            }

        }
    }


];
