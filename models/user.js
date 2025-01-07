const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        contact: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        hospitalId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true,
            default: null
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.ENUM('user', 'hospital', 'doctor', 'admin'),
            defaultValue: 'user'
        }
    });

    // Define method to validate password
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};