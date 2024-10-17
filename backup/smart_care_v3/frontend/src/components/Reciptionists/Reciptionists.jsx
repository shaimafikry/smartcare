import React, { useState } from 'react';
import './Reciptionists.css';
import 'react-datepicker/dist/react-datepicker.css';
import { postData } from '../../api';
import { handleReload } from '../../utils';

function Reception({ receptionist, message }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    national_id: '',
    address: '',
    department: '',
    phone: '',
  });

  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [nationalIdError, setNationalIdError] = useState(''); // State for National ID error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear National ID error when the user types in
    if (name === 'national_id' && nationalIdError) {
      setNationalIdError(''); // Clear error on input change
    }
  };

  const validateNationalID = (nationalID) => {
    const idRegex = /^\d{14}$/; // Only allow 14 digits
    return idRegex.test(nationalID);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if National ID is exactly 14 digits
    if (!validateNationalID(formData.national_id)) {
      setNationalIdError('National ID must be exactly 14 digits.'); // Set error state
      console.log('National ID Error:', 'National ID must be exactly 14 digits.'); // Debugging message
      return;
    }

    try {
      // عرض البيانات قبل إرسالها
      console.log('Submitting form data:', formData);
      
      const response = await postData('receptionist/dashboard', formData);  // إرسال البيانات للـ backend
      
      // التحقق من الاستجابة
      if (response && response.message === 'Patient added successfully') {
        setSuccessMessage('Patient registered successfully!');
        handleReload();
        console.log('Form Data Submitted:', response);
      } else {
        setApiError(response.message || 'Failed to register patient.');
      }
    } catch (error) {
      setApiError('Failed to register patient. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container content">
      <div>
        <h4>Register New Patient</h4>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientName">Name</label>
              <input
                type="text"
                id="patientName"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientGender">Gender</label>
              <select
                id="patientGender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientAge">Age</label>
              <input
                type="text"
                id="patientAge"
                name="age"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientID">National ID</label>
              <input
                type="text"
                id="patientID"
                name="national_id"
                placeholder="Enter National ID"
                value={formData.national_id}
                onChange={handleChange}
                required
              />
              {/* Debug: Log nationalIdError to verify state */}
              {console.log("nationalIdError:", nationalIdError)}
              
              {/* National ID error message */}
            </div>
          </div>
          <div className="form-row">
              {nationalIdError && <p className="error-message">{nationalIdError}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientAddress">Address</label>
              <input
                type="text"
                id="patientAddress"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientDepartment">Department</label>
              <select
                id="patientDepartment"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select department
                </option>
                <option value="emergency">Emergency</option>
                <option value="nursery">Nursery</option>
                <option value="bones">Bones</option>
                <option value="brain">Brain</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientPhone">Phone</label>
              <input
                type="text"
                id="patientPhone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>

          {/* General API error and success messages */}
          {apiError && <p className="error-message">{apiError}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Reception;
