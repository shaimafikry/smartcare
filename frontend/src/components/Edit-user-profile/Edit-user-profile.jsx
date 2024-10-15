import React, { useState, useEffect } from 'react';
import { fetchData, postData } from '../../api';
import './Edit-user-profile.css';

function EditUserProfile({ message }) {
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Role: '',
    Gender: '',
    Password: '',
    department: '',
    phone: '',
    address: '',
    NationalID: '',
  });

  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchData('api/EditUserProfile');
        setFormData(data);
      } catch (error) {
        setApiError('Failed to load User data.');
      }
    };
  
    fetchUserData();
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
      const response = await postData('api/update-User-profile', formData);
      setSuccessMessage('User profile updated successfully!');
      setApiError('');
      console.log('Form Data Submitted:', response);
    } catch (error) {
      setApiError('Failed to update User profile. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="edit-User-profile">
        <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-user">
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          {errorFields.includes('Name') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>Age:</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
          {errorFields.includes('Age') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>Role:</label>
          <input
            type="text"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            required
          />
          {errorFields.includes('Role') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>Gender:</label>
          <input
            type="text"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            required
          />
          {errorFields.includes('Gender') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
          {errorFields.includes('Password') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          {errorFields.includes('department') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errorFields.includes('phone') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errorFields.includes('address') && <span className="error-message">Required</span>}
        </div>
  
        <div className="form-group-user">
          <label>National ID:</label>
          <input
            type="text"
            name="NationalID"
            value={formData.NationalID}
            onChange={handleChange}
            required
          />
          {errorFields.includes('NationalID') && <span className="error-message">Required</span>}
        </div>
  
        <button type="submit">Save changes</button>
        <button type="submit">Delete User</button>
  
        {successMessage && <p className="success-message">{successMessage}</p>}
        {apiError && <p className="error-message">{apiError}</p>}
      </form>
    </div>
  );
}
export default EditUserProfile;
