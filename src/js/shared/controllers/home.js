var isClient = (typeof window != "undefined");
if (!isClient) {
    require('node-jsx').install({
        extension: '.jsx'
    });
}

var homeComponent = require('../components/home.jsx');

module.exports = function (req, res) {
    res.locals.title = 'Home page'
    res.renderComponent(homeComponent, {
        message: (isClient ? 'client' : 'server')
    })
}
