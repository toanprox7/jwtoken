var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://fcxctktjmxxtdj:9ce4a0d0579f74d3c6fd9ea94985b382fa4de715c0caa1ce1ac1d85767c4852c@ec2-54-227-240-7.compute-1.amazonaws.com:5432/db4np76m4rj0n2');

var User = sequelize.define('users',{
    facebookId:Sequelize.STRING,
    username:Sequelize.STRING,
    token:Sequelize.STRING
});

User.sync();

module.exports = User;
