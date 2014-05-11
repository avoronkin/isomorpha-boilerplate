var Test = require('../../../shared/models/Test');

module.exports.list = function (req, res) {
    Test.all(null, function (err, tests) {
        if (err) {
            res.send('error')
        } else {
            var output = [];

            tests.forEach(function (u) {
                output.push(u.toJSON()); 
            });

            res.json(output);
        }
    })
};

module.exports.create = function (req, res, next) {
    var test = new Test(req.body)
    test.save(function (err) {
        if (err) {
            res.send('error')
        } else {
            res.json(test.toJSON());
            console.log(test.toJSON());
        }
    });
}
