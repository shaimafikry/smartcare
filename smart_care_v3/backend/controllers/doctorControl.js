// dealing with patient information taken from receptionist
// import patient data
const { addPatientMedical, editPatientMedical, getPatientsInDepartment } = require('../models/patientDetail');

// add patient function
async function addNewPatient( req, res) {
  const newPatient = req.body;
	// if patient exist
	  const patient = await findPatient(newPatient.national_id);
		// if pt exist return the data 
		if (patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint exist, new visit?'});
		}
	
		await addPatientMedical(newPatient);
		return res.json({message: 'Pateint added successfully'});
};

// edit patient
async function editExistPatient(req, res){
  const newPatient = req.body;
	// if patient exist
	  const patient = await findPatient(newPatient.national_id);

  if (!patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint doesnt exost, new add?'});
		}
    //edit the pt if exist
		await editPatientMedical(req.body);
};

// show one patient profile
async function showPatient(req, res){
	const newPatient = req.body;
	// if patient exist
	  const patient = await findPatient(newPatient.national_id);

  if (!patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint doesnt exost, new add?'});
		}
    //edit the pt if exist
		return res.json(patient);

};



// show all patients
async function allPatient(req, res){
	const all = getPatientsInDepartment();
   return res.json(all);
};
module.exports = {addNewPatient, editExistPatient, showPatient, allPatient};
