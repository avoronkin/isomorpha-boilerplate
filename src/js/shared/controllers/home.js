require('../nodejsx.js');
var isClient = require('is-browser');
var homeComponent = require('../components/home.jsx');

module.exports = function (req, res) {
    res.locals.title = 'Home page'
    res.renderComponent(homeComponent, {
        message: (isClient ? 'client' : 'server')
    })
}
