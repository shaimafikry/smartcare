import React, { useState, useEffect } from 'react';
import { fetchData, postData } from '../../api';
import './EditProfile.css';

function EditProfile({ message }) {
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

  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await fetchData('doctor/patientProfile');
        setFormData(data);
      } catch (error) {
        setApiError('Failed to load patient data.');
      }
    };

    fetchPatientData();
  }, []);

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

    // Reset success message on form submission
    setSuccessMessage('');
    const emptyFields = Object.keys(formData).filter(field => !formData[field].trim());
    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      return;
    }

    try {
      const response = await postData('api/update-patient-profile', formData);
      setSuccessMessage('Patient profile updated successfully!');
      setApiError('');
      console.log('Form Data Submitted:', response);
    } catch (error) {
      setApiError('Failed to update patient profile. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleDischarge = () => {
    console.log('Discharge Permission granted');
  };

  return (
    <div className="edit-patient-profile">
      <h2>Edit Patient Profile</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</label>
            {key === 'discharge_notes' ? (
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type={key.includes('rate') || key.includes('temp') || key.includes('sugar') || key.includes('pressure') ? 'number' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            )}
            {errorFields.includes(key) && <span className="error-message">Required</span>}
          </div>
        ))}
        <div className="form-group">
          <button type="button" onClick={handleDischarge}>Discharge Permission</button>
        </div>
        <button type="submit">Submit</button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {apiError && <p className="error-message">{apiError}</p>}
      </form>
    </div>
  );
}

export default EditProfile;
