// backend/config/createPatientsTable.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // assuming the db config file for Sequelize instance

// Patient Part 1
const Patient = sequelize.define('Patients', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    national_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entry_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});

const PatientPhone = sequelize.define('PatientPhone', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

// Patient Part 2
const PatientDetails = sequelize.define('PatientDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blood_pressure: {
        type: DataTypes.STRING
    },
    sugar: {
        type: DataTypes.STRING
    },
    recovery_percentage: {
        type: DataTypes.FLOAT
    },
    medicine: {
        type: DataTypes.STRING
    },
    dose: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.STRING
    },
    is_taken: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    recovery_rate: {
        type: DataTypes.FLOAT
    },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

// Association
Patient.hasMany(PatientPhone, { foreignKey: 'patient_id' });
PatientPhone.belongsTo(Patient, { foreignKey: 'patient_id' });

Patient.hasOne(PatientDetails, { foreignKey: 'patient_id' });
PatientDetails.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = { Patient, PatientPhone, PatientDetails };
