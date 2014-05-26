var homeController = require('./controllers/home');
var exampleController = require('./controllers/example');
var errorController = require('./controllers/error404');
var authController = require('./controllers/auth');

module.exports = [{
        pattern: '/',
        name: 'home',
        handlers: [homeController]
    }, {
        pattern: '/xamples',
        name: 'examples',
        handlers: exampleController.list,
        routes: [{
            pattern: '/create',
            name: 'example.new',
            handlers: [authController, exampleController.new]
        }, {
            pattern: '/:id',
            name: 'example.show',
            handlers: exampleController.show,
            routes: [{
                pattern: '/edit',
                name: 'example.edit',
                handlers: [exampleController.edit.loadData, exampleController.edit.checkPermissions, exampleController.edit.renderComponent]
            }]
        }]
    }, {
        pattern: '*',
        name: 'error.404',
        handlers: errorController
    }


];
