// backend/config/createPatientsTable.js
const pool = require('./db');

const createPatientsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Patients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT,
        national_id VARCHAR(50) NOT NULL,
        department VARCHAR(255),
        entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS PatientPhones (
        patient_id INT REFERENCES Patients(id),
        id SERIAL PRIMARY KEY,
        phone_number VARCHAR(20) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS PatientDetails (
        patient_id INT REFERENCES Patients(id),
        id SERIAL PRIMARY KEY,
        blood_pressure VARCHAR(50),
        sugar VARCHAR(50),
        recovery_percentage DECIMAL,
        medicine VARCHAR(255),
        dose VARCHAR(50),
        time TIMESTAMP,
        is_taken BOOLEAN DEFAULT false,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS History (
        patient_id INT REFERENCES Patients(id),
        id SERIAL PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Patients tables created successfully.');
  } catch (err) {
    console.error('Error creating Patients tables:', err);
  }
};

module.exports = createPatientsTable;
