const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define("appointment", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true,
            default: null
        },
        doctorId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true,
            default: null
        },
        
        description:{
            type:Sequelize.STRING,
            allowNull:true
        },
        date:{
            type:Sequelize.DATE,
            allowNull:true
        },
        time:{
            type:Sequelize.STRING,
            allowNull:true
        },
        status:{
            type:Sequelize.STRING,
            allowNull:true
        },
        
    });
    return Appointment;
};