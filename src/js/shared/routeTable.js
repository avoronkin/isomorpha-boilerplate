var fs = require('fs');
var path = require('path');
var testController = require('./controllers/test');
var homeController = require('./controllers/test');
var errorController = require('./controllers/error404');

module.exports = [{
        pattern: '/',
        name: 'home',
        handlers: homeController
    }, {
        pattern: '/test',
        name: 'test',
        handlers: testController.list
    }, {
        pattern: '*',
        name: '404',
        handlers: errorController 
    }


];
