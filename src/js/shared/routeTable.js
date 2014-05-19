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
        handlers: exampleController.list
    }, {
        pattern: '/examples/create',
        // name: 'create examples',
        handlers: [exampleController.create]

    }, {
        pattern: '/examples/:id',
        // name: 'show examples',
        handlers: exampleController.show
    }, {
        pattern: '/examples/:id/edit',
        // name: 'edit example',
        handlers: [exampleController.edit]
    }, {
        pattern: '*',
        // name: '404',
        handlers: errorController 
    }


];
