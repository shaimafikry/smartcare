// backend/config/createRelationshipsTable.js
const pool = require('./db');

const createRelationshipsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Doc_Patient (
        doctor_id INT REFERENCES Users(id),
        patient_id INT REFERENCES Patients(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Nurse_Patient (
        nurse_id INT REFERENCES Users(id),
        patient_id INT REFERENCES Patients(id)
      );
    `);

    console.log('Relationships tables created successfully.');
  } catch (err) {
    console.error('Error creating Relationships tables:', err);
  }
};

module.exports = createRelationshipsTable;
