var modella = require('modella');
var validators = require('modella-validators');
var ajaxSync = require('modella-ajax');
var Test = modella('Test');
var isBrowser = require('is-browser');

Test.use(validators);
Test.use('browser', ajaxSync('/api/test'))

if(!isBrowser){
    var mongo = require('modella-mongo');
    Test.use('server', mongo('localhost/db'));
}

Test.attr('_id')
    .attr('username', {
        required: true
    })
    .attr('email', {
        required: true,
        format: 'email'
    });

module.exports = Test;
