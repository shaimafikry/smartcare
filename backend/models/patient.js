// patient module
const { Patient, PatientDetails } = require('../config/patients');
const { Op } = require('sequelize'); // Import Op for Sequelize operators

// Mark: receptionist_add
async function addPatient(patient) {
    try {
        const newPatient = await Patient.create(patient);
        return newPatient.get({ plain: true });
    } catch (error) {
        throw new Error(`Error adding patient: ${error.message}`);
    }
}

// Mark: receptionist_edit
async function editPatient(id, updatedData) {
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            throw new Error('Patient not found');
        }

        await Patient.update(updatedData, { where: { id } });
        return true;
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
}

// Mark: discharge patient
async function dischargePatient(id) {
    await Patient.update({ status: 'out' }, { where: { id } });
    return true;
}

// Function to find a patient
async function findPatient(searchInput) {
    try {
        // Determine if searchInput is a valid integer (for id) or string (for name)
        const isNumber = !isNaN(searchInput);

        // Construct the where clause based on the type of searchInput
        const whereClause = isNumber
            ? { id: parseInt(searchInput, 10) } // Search by ID if it's a number
            : {
                name: {
                    [Op.iLike]: `%${searchInput}%`, // Case-insensitive matching
                },
            };

        const patient = await Patient.findOne({
            where: whereClause,
            include: [PatientDetails], // Include related details
        });

        return patient ? patient.get({ plain: true }) : null; // Return plain object or null
    } catch (error) {
        throw new Error(`Error finding patients: ${error.message}`);
    }
}

// Receptionist search to add
async function receptionistFindOnePatient(national_id) {
    try {
        const patient = await Patient.findOne({
            where: { national_id },
        });

        return patient ? patient.get({ plain: true }) : null; // Return plain object or null
    } catch (error) {
        throw new Error(`Error finding patient: ${error.message}`);
    }
}

// Receptionist search
async function receptionistFindPatient(searchInput) {
    try {
        const whereClause = {
            [Op.or]: [
                { national_id: searchInput }, // Search by national_id
                {
                    name: {
                        [Op.iLike]: `%${searchInput}%`, // Case-insensitive name search
                    },
                },
            ],
        };

        const patients = await Patient.findAll({ where: whereClause });

        return patients.map(patient => patient.get({ plain: true })); // Return plain objects
    } catch (error) {
        throw new Error(`Error finding patients: ${error.message}`);
    }
}

// Edit patient medical records
async function editPatientMedical(id, updatedData) {
    try {
        const { discharge, ...data } = updatedData; // Destructure discharge flag

        // Check if there are past records
        const patientMedRecord = await PatientDetails.findOne({ where: { patient_id: id } });
        if (patientMedRecord) {
            await PatientDetails.update(data, { where: { patient_id: id } });
        } else {
            await PatientDetails.create({ patient_id: id, ...data });
        }

        if (discharge) {
            await dischargePatient(id);
        }

        return true;
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
}

// Get patients in department
async function getPatientsInDepartment(departmentName) {
    try {
        const patients = await Patient.findAll({
            where: {
                department: departmentName, // Filter by department
                status: ['new', 'resident'], // Status should be either 'new' or 'resident'
            },
            include: [PatientDetails], // Include relational Patient details
            order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
        });

        return patients.length ? patients : null; // Return patients or null
    } catch (error) {
        console.error(`Error fetching patients: ${error.message}`);
        throw error; // Handle the error
    }
}

// Get all patients
async function getAllPatients() {
    try {
        const patients = await Patient.findAll({
            include: [PatientDetails], // Include relational Patient details
            order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
        });

        return patients.length ? patients : null; // Return patients or null
    } catch (error) {
        console.error(`Error fetching patients: ${error.message}`);
        throw error; // Handle the error
    }
}

// Export functions
module.exports = {
    addPatient,
    editPatient,
    findPatient,
    receptionistFindPatient,
    dischargePatient,
    editPatientMedical,
    getPatientsInDepartment,
    receptionistFindOnePatient,
    getAllPatients,
};
