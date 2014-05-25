var isClient = require('is-browser');
// Simple route middleware to ensure user is authenticated.
// //   Use this route middleware on any resource that needs to be protected.  If
// //   the request is authenticated (typically via a persistent login session),
// //   the request will proceed.  Otherwise, the user will be redirected to the
// //   login page.
module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    if (isClient) {
        window.location.href = '/login';
        // window.location.reload(); 
    }else{
        res.redirect('/login')
    }
}