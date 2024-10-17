// dealing with patient information taken from receptionist
// import patient data
const {addPatient, findPatient} = require('../models/patient');

// add patient function
async function addNewPatient(req, res) {
	const newPatient = req.body;
	
	// عرض البيانات اللي جايه من الـ POST request
	console.log('Received data:', newPatient);
  
	// التحقق إذا كان المريض موجود بالفعل
	const patient = await findPatient(newPatient.national_id);
	
	if (patient) {
		console.log('Patient exists');
	  return res.json({ message: 'Patient exists, new visit?' });
	}
  
	try {
		console.log('trying....');
	  await addPatient(newPatient);
	  console.log('saved data:', newPatient);
	  return res.json({ message: 'Patient added successfully' });
	} catch (error) {
	  console.error('Error adding patient:', error.message);
	  return res.status(500).json({ message: 'Error adding patient' });
	}
  }
  

// edit patient
async function editPatient(req, res){
  const newPatient = req.body;
	// if patient exist
	  const patient = await findPatient(newPatient.national_id);

  if (!patient) {
			// ask for new visit or edit pt data
       return res.json({message: 'Pateint doesnt exost, new add?'});
		}
    //edit the pt if exist
		
};



module.exports = {addNewPatient, editPatient};
