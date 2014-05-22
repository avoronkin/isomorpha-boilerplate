var routeManager = require('../routeManager');

module.exports = {
    helpers: {
        getLink: routeManager.getLink.bind(routeManager)
    }
}
