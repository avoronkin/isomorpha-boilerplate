var isClient = (typeof window != "undefined");
if (!isClient) {
    var nodeJsx = require('node-jsx');
    nodeJsx.install({
        extension: '.jsx'
    });
}

var errorComponent = require('../components/error404.jsx');

module.exports = function (req, res) {
    res.renderComponent(errorComponent);
}
