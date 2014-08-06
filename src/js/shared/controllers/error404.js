require('../nodejsx.js');
var errorComponent = require('../components/error404.jsx');

module.exports = function(req, res) {
  res.locals.title = 'Page not found';
  res.renderComponent(errorComponent);
}
