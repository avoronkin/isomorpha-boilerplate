var express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session')

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GITHUB_CLIENT_ID = "c6200af23d448b8ad3fe";
var GITHUB_CLIENT_SECRET = "eb71af40710e63e75b97d191860e48612e7a32e9";

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));


var app = express();

app.use(cookieParser('ghgjhghjgjhguyuyyiuiuyuyuysdfv')) // required before session.
app.use(session({
    secret: 'ertghtjlgflh;kdlipo5i9045tgjnvbu4tujgijjigjgjmdklngmbnmblnkb',
    name: 'sid',
    saveUninitialized: true,
    resave: true
}))
app.use(passport.initialize());
app.use(passport.session());


// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHubwill redirect the user
//   back to this application at /auth/github/callback
app.get('/login', passport.authenticate('github'));

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = {
    app: app,
    passport: passport
};
