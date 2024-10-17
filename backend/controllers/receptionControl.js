// dealing with patient information taken from receptionist
// import patient data
const {addPatient, receptionistFindPatient, receptionistFindOnePatient} = require('../models/patient');

// add patient function
async function addNewPatient( req, res) {
  const newPatient = req.body;
	// if patient exist
	console.log(newPatient);
	console.log(newPatient.national_id)
	  const patient = await receptionistFindOnePatient(newPatient.national_id);
		console.log("after search",patient);
		// if pt exist return the data 
		if (patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint exist, new visit?'});
		}
	
		await addPatient(newPatient);
		return res.json({message: 'Pateint added successfully'});
};

// edit patient
async function editPatient(req, res){
  const newPatient = req.body;
	// if patient exist
	  const patient = await receptionistFindOnePatient(newPatient.national_id);

  if (!patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint doesnt exist, new add?'});
		}
    //edit the pt if exist
		
};



module.exports = {addNewPatient, editPatient};
