var isClient = (typeof window != "undefined");
if (!isClient) {
    require('node-jsx').install({
        extension: '.jsx'
    });
}

var errorComponent = require('../components/error404.jsx');

module.exports = function (req, res) {
  console.log('error component', errorComponent);
    res.locals.title = 'Page not found';
    res.renderComponent(errorComponent);
}
