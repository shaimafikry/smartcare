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
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.STRING,
        allowNull: true
    },
    national_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: { // i make it default new , trgger to residnet if updated
        type: DataTypes.STRING,
        allowNull: false,
				defaultValue: 'new', // Set default value to 'new'
    }
}, {
    timestamps: true
});



// Patient Part 2
const PatientDetails = sequelize.define('PatientDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    complain: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    treatment: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    history: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    diagnosis: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    heart_rate: {
        type: DataTypes.STRING,
        allowNull: true
    },
      // Body temperature
    temp: {
        type: DataTypes.STRING,
        allowNull: true
    },
     // Random blood sugar (RBS)
    sugar: {
        type: DataTypes.STRING,
        allowNull: true
    },
     // Oxygen saturation level
    oxygen_sat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    blood_pressure: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    // Respiratory rate
    res_rate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discharge_notes: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    // Foreign key to Patient model
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,  // Reference to the Patient model
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    timestamps: true
});


Patient.hasOne(PatientDetails, { foreignKey: 'patient_id' });
PatientDetails.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = { Patient, PatientDetails };
