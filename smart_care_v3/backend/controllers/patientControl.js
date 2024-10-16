// dealing with patient information taken from receptionist
// import patient data
const { addPatient, editPatient, findPatient, receptionistFindPatient, dischargePatient, getPatientsInDepartment, editPatientMedical, getAllPatients } = require('../models/patient');


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
	// const patientId = req.params.id; // Get patient ID from the URL
	// const newPatient = req.body;
	const patientId = parseInt(req.params.id);
	// const newPatient = req.body;
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
	user = req.user;
	console.log(req.user)
	// console.log(token);
	const all = await getPatientsInDepartment(user.department);
	// andle if all is null
	if (all === null){
		return res.json({message: "no current data"});
	}

	// console.log("in patient control",all);
   return res.json(all);
};




// show all patients in on depatrment
async function allPatients(req, res){
	user = req.user;
	console.log(req.user)
	// console.log(token);
	const all = await getAllPatients();
	// andle if all is null
	if (all === null){
		return res.json({message: "no current data"});
	}

	// console.log("in patient control",all);
   return res.json(all);
};


module.exports = { editExistPatient, showPatient, departmentPatients, allPatients};
