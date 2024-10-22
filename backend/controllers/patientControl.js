// dealing with patient information taken from receptionist
// import patient data
const { addPatient, editPatient, findPatient,receptionistFindOnePatient, receptionistFindPatient, dischargePatient, getPatientsInDepartment, editPatientMedical, getAllPatients } = require('../models/patient');


// edit patient medical
async function editExistPatient(req, res){
  const newPatient = req.body;
	
	const patientId = parseInt(req.params.id);

	// console.log("edit exist patient body",newPatient);

	// if patient exist
	  const patient = await findPatient(patientId);

  if (!patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint doesnt exist, new add?'});
		}
    //edit the pt if exist
		try {

			await editPatientMedical(patientId, newPatient);
		  return res.json({message: 'Pateint added successfully'});

		} catch {
	     console.error({message: 'cant add patient'});
			return res.json({message: 'Pateint not added '});

		}
};


// show one patient profile
async function showPatient(req, res){

	const patientId = parseInt(req.params.id);

	// if patient exist
	const patient = await findPatient(patientId);

  if (!patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint doesnt exist'});
		}
    //edit the pt if exist
		return res.json(patient);

};



// show all patients in on depatrment
async function departmentPatients(req, res){

	const department = req.params.department;
	const all = await getPatientsInDepartment(department);
	// andle if all is null
	if (all === null){
		return res.json({message: "no current data"});
	}

	// console.log("in patient control",all);
   return res.json(all);
};




// show all patients in on depatrment
async function allPatients(req, res){
	const all = await getAllPatients();
	// console.log(all);
	// andle if all is null
	if (all === null){
		return res.json({message: "no current data"});
	}

	// console.log("in patient control",all);
   return res.json(all);
};




// add patient function
async function addNewPatient( req, res) {

  const newPatient = req.body;
	// if patient exist
	  const patient = await receptionistFindOnePatient(newPatient.national_id);
		// if pt exist return the data 
		if (patient) {
			// ask for new visit or edit pt data
       return res.status(400).json({message: 'Pateint exist, new visit?'});
		}
		await addPatient(newPatient);
		return res.status(200).json({message: 'Pateint added successfully'});
};



module.exports = { addNewPatient, editExistPatient, showPatient, departmentPatients, allPatients};
