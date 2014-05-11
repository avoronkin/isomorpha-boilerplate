var React = require('react');
var isClient = require('is-browser');





module.exports = function (params) {

    return function (req, res, next) {

        res.renderComponent = function (Component, data, callback) {
            var html = React.renderComponentToString(Component(data));
            if (isClient) {
                document.getElementById(params.rootElId).innerHTML = html;
            } else {
                var layoutHtml = params.layoutHtml;
                layoutHtml = layoutHtml.replace("######", html)
                res.send(layoutHtml);
            }
        }

        next();
    }
}
