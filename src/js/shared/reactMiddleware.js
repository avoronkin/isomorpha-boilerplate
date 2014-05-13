var React = require('react');
var isClient = require('is-browser');





module.exports = function (params) {
    
    return function (req, res, next) {
        req.firstRender = params.firstRender;

        res.renderComponent = function (Component, data, callback) {

            if (isClient) {
                React.renderComponent(Component(data), document.getElementById(params.rootElId));
            } else {
                var html = React.renderComponentToString(Component(data));

                res.render(params.layoutName, {
                    data: data,
                    component: html
                });

            }

            params.firstRender = false;
        }

        next();
    }
}
