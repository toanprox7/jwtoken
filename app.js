const express = require('express');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const path = require('path');
// const session = require('express-session');
// const passportConfig = require('./config/passport-facebook');
const routes = require('./routes/user');
// const passport = require('passport');
const User = require('./models/users');
const nunjucks = require('nunjucks');
const jwt = require('jsonwebtoken');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');

nunjucks.configure('views',{
    autoescape:true,
    express:app
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieSession({maxAge:24*60*60*1000,keys:['aklshlakhhsgfdsbfksdf']}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());



// app.use(session({secret:'toanpro',resave:false,saveUninitialized:true,cookie:{secure:true}}));
app.use(passport.initialize());
app.use(passport.session());





passport.use(new FacebookStrategy({
    clientID:"2198978167027408",
    clientSecret:"6e769293b873fd5fb96ccc819b7217aa",
    callbackURL:'http://localhost:3000/auth/facebook/callback'
}, function (accessToken,refreshToken,profile,done) {
    User.create({facebookId:profile.id,username:profile.displayName})
        .then(function (user) {
            // console.log(user.dataValues.facebookId);
            done(null,user)
        }).catch(function (err) {
        done(err);
    })}
));



passport.serializeUser(function (users,done) {
    console.log('OK');
    done(null,users.id);

});

passport.deserializeUser(function (id,done) {

    User.findById(id)
        .then(function (users) {
            done(null,users)
        }).catch(function (err) {
        done(err)
    });
});

app.use('/auth',routes);
app.get('/',function (req,res,next) {
    // console.log(req.session.passport);
    res.render('login');
});


app.use(function (req,res,next) {
    var err = new Error('Not Found');
    err.status =404;
    next(err);
});


app.listen(3000, function () {
    console.log('server running on port 3000');
});

module.exports=app;