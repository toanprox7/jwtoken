var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users');


passport.serializeUser(function (user,done) {
    done(null,user.id);

});

passport.deserializeUser(function (id,done) {
    User.findById(id, function (err,user) {
        done(err,user);
    });
});

passport.use(new FacebookStrategy({
    clientID:"2198978167027408",
    clientSecret:"6e769293b873fd5fb96ccc819b7217aa",
    callbackURL:'http://localhost:3000/auth/facebook/callback'
}), function (accessToken,refreshToken,profile,done) {
    User.create({facebookId:profile.id,username:profile.displayName})
        .then(function (user) {
        done(null,user)
    }).catch(function (err) {
        throw err;
    })
});

module.exports =passport;
