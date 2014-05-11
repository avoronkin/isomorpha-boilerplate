var isClient = (typeof window != "undefined");
var Test = require('../models/Test');

module.exports.list = function (req, res, next) {

    console.log('test handler');
    if (!isClient) {
        res.send('test')
    } else {

        Test.all(function(err, u) {
            console.log('get all', u) 
        });

        var test = new Test({
            username: 'toritor',
            email: 'feirioe@fldgkd.ro'
        });

        test.save();
    }

}

