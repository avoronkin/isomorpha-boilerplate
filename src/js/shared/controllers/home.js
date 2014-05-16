var isClient = (typeof window != "undefined");
if (!isClient) {
    var nodeJsx = require('node-jsx');
    nodeJsx.install({
        extension: '.jsx'
    });
}

var homeComponent = require('../components/home.jsx');

module.exports = function (req, res) {
    res.renderComponent(homeComponent, {
        message: (isClient ? 'client' : 'server')
    })
}
