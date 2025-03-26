module.exports = (sequelize, Sequelize) => {
    const PatientRecord = sequelize.define("patientRecord", {
        patientId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
           
        },
        doctorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
          
        },
        diagnosis: {
            type: Sequelize.STRING,
            allowNull: false
        },
        treatment: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        prescription: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });

    return PatientRecord;
};
