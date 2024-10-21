import React, { useState, useEffect } from 'react';
import { fetchData, putData } from '../../api';
import './EditPatientProfile.css';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { decodeJWT } from '../../utils';


function EditProfile({ message }) {
	const navigate = useNavigate();
	const { id } = useParams();
	const [formData, setFormData] = useState({
    complain: '',
    treatment: '',
    history: '',
    diagnosis: '',
    heart_rate: '',
    temp: '',
    sugar: '',
    oxygen_sat: '',
    blood_pressure: '',
    res_rate: '',
    discharge_notes: '',
  });
	const [isLoading, setIsLoading] = useState(true); // Add a loading state
	const [isDischargeActivated, setIsDischargeActivated] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
	const [userRole, setUserRole] = useState('');
	const [userDepartment, setUserDepartment] = useState('');



  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await fetchData(`patients/${id}/edit`);
				// Set form fields to the data fetched (if they exist)
				const {
					complain,
					treatment,
					history,
					diagnosis,
					heart_rate,
					temp,
					sugar,
					oxygen_sat,
					blood_pressure,
					res_rate,
					discharge_notes
			} = data.PatientDetail || {};
	
			// Set the extracted fields in the form data
			setFormData(prevFormData => ({
					...prevFormData,
					complain,
					treatment,
					history,
					diagnosis,
					heart_rate,
					temp,
					sugar,
					oxygen_sat,
					blood_pressure,
					res_rate,
					discharge_notes
			}));
				// console.log(formData);
        setIsLoading(false); // Data is loaded, stop loading
				// console.log('here is a lof ', data.id);
      } catch (error) {
        setApiError('Failed to load patient data.');
      }
    };

    // GE THE TOKEN DATA
		const user = decodeJWT(localStorage.getItem('token'))
    // const user = {role: "patients", department: ""};
		setUserRole(user.role); 
		setUserDepartment(user.department);;

    fetchPatientData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field if it was previously marked as an error
    if (errorFields.includes(name)) {
      setErrorFields(errorFields.filter(field => field !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // uptade form data
		 const updatedFormData = {
      ...formData,
      discharge: isDischargeActivated ,  // Set flag based on discharge button
    };
    // Reset success message on form submission
    setSuccessMessage('');

    try {
      const response = await putData(`patients/${id}/edit`, updatedFormData);
      setSuccessMessage('Patient profile updated successfully!');
      setApiError('');
      console.log('Form Data Submitted:', response);
			navigate(`/patients/${userDepartment}`);
    } catch (error) {
      setApiError('Failed to update patient profile. Please try again.');
      console.error('Error:', error);
    }
  };



	const activateDischarge = () => {
		setIsDischargeActivated(!isDischargeActivated);
	};



	if (isLoading) {
   return <div>Loading patient data...</div>; // Show a loading message while data is being fetched
 }


  return (
    <div className="edit-patient-profile">
      <h2>Edit Patient Profile</h2>
      <form className="patientform" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</label>
            {key === 'discharge_notes' ? (
              <textarea
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                
              />
            ) : (
              <input
                type='text'
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                
              />
            )}
            {errorFields.includes(key) && <span className="error-message">Required</span>}
          </div>
        ))}
        
				{/* Conditionally render the Discharge button if user is not a nurse */}
				 {userRole !== 'nurse' && (
          <div className="form-group">
            <button className={`button-discharge ${isDischargeActivated ? 'active' : ''}`} type="button" onClick={activateDischarge}>
              Discharge Permission
            </button>
          </div>
        )}

        <button type="submit">Submit</button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {apiError && <p className="error-message">{apiError}</p>}
      </form>
    </div>
  );
}

export default EditProfile;
