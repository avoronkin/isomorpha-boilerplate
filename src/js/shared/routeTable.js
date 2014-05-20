var homeController = require('./controllers/home');
var exampleController = require('./controllers/example');
var errorController = require('./controllers/error404');

//TODO support names for routs

module.exports = [{
        pattern: '/',
        // name: 'home',
        handlers: homeController
    }, {
        pattern: '/examples',
        // name: 'example',
        handlers: exampleController.list,
        routes: [{
            pattern: '/create',
            // name: 'create examples',
            handlers: [exampleController.create]
        }, {
            pattern: '/:id',
            // name: 'show examples',
            handlers: exampleController.show,
            routes: [{
                pattern: '/edit',
                // name: 'edit example',
                handlers: [exampleController.edit]
            }]
        }]
    }, {
        pattern: '*',
        // name: '404',
        handlers: errorController
    }


];
