import React, { useState, useEffect } from 'react';
import { fetchData, putData } from '../../api';
import './Profile.css';
import { decodeJWT } from '../../utils';

function EditProfile({ message }) {
  const [formData, setFormData] = useState({
    email: '',
    old_Password: '', // Added oldPassword field
    new_Password: '',
    role: '',
    name: '',
    age: '',
    department: '',
    phone: '',
    national_id: '',
  });

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  
  const user = decodeJWT(localStorage.getItem('token'));
  const userRole = user.role;

  useEffect(() => {
		const fetchPatientData = async () => {
			try {
				const data = await fetchData('profile');
				
				// Log the data received to debug
				console.log("Data from backend:", data);
				
				// Check if user object exists and then update form data
				if (data && data.user) {
					setFormData({
						email: data.user.email || '',
						role: data.user.role || '',
						old_Password: '', // Old password for validation
						new_Password: '', // Password will be blank initially for editing
						name: data.user.name || '',
						age: data.user.age || '',
						department: data.user.department || '',
						phone: data.user.phone || '',
						national_id: data.user.national_id || '',
					});
				} else {
					setApiError('Failed to load user data.');
				}
				
				setIsLoading(false); // Data is loaded
			} catch (error) {
				setApiError('Failed to load patient data.');
				console.error('Error fetching data:', error);
			}
		};
	
		fetchPatientData();
	}, [userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errorFields.includes(name)) {
      setErrorFields(errorFields.filter(field => field !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      old_Password: formData.old_Password, // Send old password for validation
      password: formData.new_Password, // Send new password for update
    };
    setSuccessMessage('');
    
    try {
      const response = await putData('profile', updatedFormData);
      setSuccessMessage('Password updated successfully!');
      setApiError('');
      console.log('Password Updated:', response);
    } catch (error) {
      setApiError(error.message || 'Failed to update password. Please try again.');
      console.error(error);
			console.log('apierror',apiError);
    }
  };

  // if (isLoading) {
  //   return <div>Loading user data...</div>;
  // }

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form className="patientform" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</label>
            {key === 'new_Password' || key === 'old_Password' ? (
              <input
                type="password"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key === 'new_Password' ? "Enter new password" : "Enter old password"}
              />
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key]}
                disabled // Make all other fields non-editable
              />
            )}
            {errorFields.includes(key) && <span className="error-message">Required</span>}
          </div>
        ))}
        <button type="submit">Update Password</button>

        {successMessage && <p className="success-message-profile-page">{successMessage}</p>}
        {apiError && <p className="error-message-profile-page">{apiError}</p>}
      </form>
    </div>
  );
}

export default EditProfile;
