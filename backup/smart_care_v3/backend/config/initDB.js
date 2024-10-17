// backend/config/initDB.js
const sequelize = require('./db'); // Sequelize instance
const { Users } = require('./users');
const { Patients, PatientDetails } = require('./patients');
//  const { DoctorPatient, NursePatient } = require('./relationships');

// Sync models with database (creates tables if they don't exist)
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch((err) => {
    console.error('Error creating tables:', err);
});

module.exports = {
    Users,
    Patients,
    PatientDetails,
};
