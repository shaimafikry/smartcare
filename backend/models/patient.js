
// patient module
const { Patient, PatientDetails } = require('../config/patients');
const { Op } = require('sequelize'); // Make sure to import Op for Sequelize operators


// Mark:receptionist_add
async function addPatient(patient) {

    try {

			const newPatient = await Patient.create(patient); 
        return newPatient.get({ plain: true });
    } catch (error) {
        throw new Error(`Error adding patient: ${error.message}`);
    }
}



// Mark: receptionist edit
async function editPatient(id, updatedData) {

    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            throw new Error('Patient not found');
        }

        await Patient.update(updatedData, { where: { id: id } });
        return true;
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
}



// make status 'out' when discharge patient
async function dischargePatient(id) {
    
        await Patient.update({ status: 'out' }, { where: { id: id } });
        return true;
}



async function findPatient(searchInput) {
    try {
				 // Determine if the searchInput is a valid integer (for id) or string (for name)
				 const isNumber = !isNaN(searchInput);

				 // Construct the where clause based on whether searchInput is a number or a string
				 const whereClause = isNumber
						 ? { id: parseInt(searchInput, 10) } // Search by ID if it's a number
						 : {
									 // Otherwise, search by name using case-insensitive matching
									 name: {
											 [Op.iLike]: `%${searchInput}%`
									 }
							 };
 

        const patient = await Patient.findOne({
            where: whereClause,
            include: [PatientDetails], // Include related details
        });
        // console.log("patient module",patient);
        return patient.get({ plain: true }); // Return plain objects of the patients
    } catch (error) {
        throw new Error(`Error finding patients: ${error.message}`);
    }
}



// receptioinst search to add 
async function receptionistFindOnePatient(national_id) {
    try {
        // Constructing the where clause to search by either national_id or name
        const patient = await Patient.findOne({
            where:{ national_id: national_id},
        });

				if (!patient) {
					return null; // Or throw an error
			}
        return patient.get({ plain: true }); // Return plain objects of the patients
    } catch (error) {
        throw new Error(`Error finding patients: ${error.message}`);
    }
}


// receptioinst search
async function receptionistFindPatient(searchInput) {
	try {
			// Constructing the where clause to search by either national_id or name
			const whereClause = {
					[Op.or]: [
							{
									national_id: searchInput // Search by national_id
							},
							{
									name: {
											[Op.iLike]: `%${searchInput}%` // Search by name with case-insensitive matching
									}
							}
					]
			};

			const patients = await Patient.findAll({
					where: whereClause,
			});

			return patients.map(patient => patient.get({ plain: true })); // Return plain objects of the patients
	} catch (error) {
			throw new Error(`Error finding patients: ${error.message}`);
	}
}



//patientDetail Table

async function editPatientMedical(id, updatedData) {
    try {
			  const { discharge, ...Data } = updatedData; // Destructure the discharge flag from the body

			  // check if i has psat records
				const patientMedRecord = await PatientDetails.findOne({ where: { patient_id: id } });
				if (patientMedRecord) {

					await PatientDetails.update(Data, { where: { patient_id: id } });
				}
				 
        else {
					await PatientDetails.create({ patient_id: id, ...Data });
				}
				if (discharge){
					await dischargePatient(id);
				}
				return true;
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
}



async function getPatientsInDepartment(departmentName) {
    try {
        const patients = await Patient.findAll({
            where: {
                department: departmentName, // Replace with actual department
                status: ['new', 'resident'] // Status should be either 'new' or 'persist'
            },
						include: [PatientDetails], // to include ralational Patient details
            order: [
                ['createdAt', 'DESC'] // Sort by createdAt in descending order
            ]
        });
        // console.log(patients);
        // Check if patients array is empty
        if (patients.length === 0) {
            return null;
        }

        return patients; // Return the array of patients
    } catch (error) {
        console.error(`Error fetching patients: ${error.message}`);
        throw error; // Handle the error
    }
}




async function getAllPatients() {
	try {
			const patients = await Patient.findAll();
			// console.log(patients);
			// Check if patients array is empty
			if (patients.length === 0) {
					return null;
			}

			return patients; // Return the array of patients
	} catch (error) {
			console.error(`Error fetching patients: ${error.message}`);
			throw error; // Handle the error
	}
}




module.exports = { addPatient, editPatient, findPatient, receptionistFindPatient, dischargePatient, editPatientMedical, getPatientsInDepartment, receptionistFindOnePatient, getAllPatients };
