const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,  
            allowNull: false, 
        },
        contact: {
            type: Sequelize.STRING,
            allowNull: true,
        },
       
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.ENUM('user', 'hospital', 'doctor', 'admin'),
            defaultValue: 'user'
        },
        image:{
            type:Sequelize.STRING,
            allowNull:true
        },
        description:{
            type:Sequelize.STRING,
            allowNull:true
        },
        address:{
            type:Sequelize.STRING,
            allowNull:true
        },
        featured:{
            type:Sequelize.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        speciality:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });

    // Define method to validate password
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};