var isClient = (typeof window != "undefined");
var Test = require('../models/Test');
var _ = require('lodash');

if (!isClient) {
    var nodeJsx = require('node-jsx');
    nodeJsx.install({
        extension: '.jsx'
    });
}

var testComponent = require('../components/test.jsx');

module.exports.list = function (req, res, next) {
    console.log('test handler');

    if(isClient && req.firstRender){
        console.log('first render on client', sharedData) 
        res.renderComponent(testComponent, sharedData);
    }else{
        Test.all(function (err, u) {
            res.renderComponent(testComponent, {
                test: 'test',
                data: _.invoke(u,'toJSON')
            });
        });
    }


}
