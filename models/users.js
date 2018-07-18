var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:toanprox7@localhost:5433/postgres');

var User = sequelize.define('users',{
    facebookId:Sequelize.STRING,
    username:Sequelize.STRING,
    token:Sequelize.STRING
});

User.sync();

module.exports = User;