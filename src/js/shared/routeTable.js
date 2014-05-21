var homeController = require('./controllers/home');
var exampleController = require('./controllers/example');
var errorController = require('./controllers/error404');

module.exports = [{
        pattern: '/',
        name: 'home',
        handlers: homeController
    }, {
        pattern: '/xamples',
        name: 'examples',
        handlers: exampleController.list,
        routes: [{
            pattern: '/create',
            name: 'example.create',
            handlers: exampleController.create
        }, {
            pattern: '/:id',
            name: 'example.show',
            handlers: exampleController.show,
            routes: [{
                pattern: '/edit',
                name: 'example.edit',
                handlers: [exampleController.edit]
            }]
        }]
    }, {
        pattern: '*',
        name: 'error.404',
        handlers: errorController
    }


];
