var isClient = (typeof window != "undefined");
var Test = require('../models/Test');

if (!isClient) {
    var nodeJsx = require('node-jsx');
    nodeJsx.install({
        extension: '.jsx'
    });
}

var testComponent = require('../components/test.jsx');

module.exports.list = function (req, res, next) {

    console.log('test handler');

    Test.all(function (err, u) {
        console.log('get all', u)
        res.renderComponent(testComponent);
    });


}
