// dealing with patient information taken from receptionist
// import patient data
const { addPatient, editPatient, findPatient, receptionistFindPatient, dischargePatient } = require('../models/patient');
const { addPatientMedical, editPatientMedical, getPatientsInDepartment } = require('../models/patientDetail');

// add patient function
async function addNewPatientMedical( req, res) {
  const newPatient = req.body;
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
	user = req.user;
	console.log(req.user)
	// console.log(token);

	const all = await getPatientsInDepartment(user.department);
	console.log("in doctor control",all);
   return res.json(all);
};
module.exports = {addNewPatientMedical, editExistPatient, showPatient, allPatient};
