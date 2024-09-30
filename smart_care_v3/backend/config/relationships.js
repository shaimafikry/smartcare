// backend/config/createRelationshipsTable.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // assuming the db config file for Sequelize instance

const DoctorPatient = sequelize.define('DoctorPatient', {
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

const NursePatient = sequelize.define('NursePatient', {
    nurse_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

// Associations (assuming Doctor and Nurse models are defined elsewhere)
module.exports = { DoctorPatient, NursePatient };
