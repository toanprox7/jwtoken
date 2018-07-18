var express = require('express');
var router = express.Router();
var passport = require('passport');
var User =require('../models/users');
var jwt = require('jsonwebtoken');
var secretKey="My Secret";

router.get('/', function (req,res,next) {
    res.render('login');
});

router.get('/admin', function (req,res,next) {
    // console.log(req.user);
    var payload={
        username:req.user.username,
        facebookId:req.user.facebookId
    };
    var token = jwt.sign(payload, secretKey, {algorithm: 'HS256', expiresIn: '1h'});
    User.update({token:token},{where:{facebookId:req.user.facebookId}});
    res.cookie("token",token);
   res.render('admin',{user:req.user.username});
});

router.get('/facebook', passport.authenticate('facebook',{scope:['public_profile']}));
router.get('/facebook/callback',passport.authenticate('facebook',{successRedirect:'/auth/admin', failureRedirect:'/login', session:true}));
module.exports =router;