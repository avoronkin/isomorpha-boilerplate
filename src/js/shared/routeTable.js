var fs = require('fs');
var path = require('path');
var testController = require('./controllers/test');

var isClient = (typeof window != "undefined");

module.exports = [{
        pattern: '/',
        name: 'home',
        handlers: [

            function (req, res, next) {
                console.log('home handler');
                res.test = 'test';
                next();
            },
            function (req, res) {
                if (!isClient) {
                    fs.readFile(path.resolve(__dirname, '../../../dist/layout.html'), function (err, data) {
                        if (err) throw err;
                        console.log('data', data.toString());
                        res.send(data.toString())
                    });
                }
                // console.log('home handler 2', res)
            }
        ]
    }, {
        pattern: '/test',
        name: 'test',
        handlers: testController.list 
     },  {
        pattern: '*',
        name: '404',
        handlers: function (req, res, next) {
            console.log('404 handler');

            if (!isClient) {
                res.send('error 404')
            }

        }
    }


];
