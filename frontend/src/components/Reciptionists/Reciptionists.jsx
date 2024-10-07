import React, { useState } from 'react';
import './Reciptionists.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postData } from '../../api';

function Reception({ receptionist, message }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    national_id: '',
    address: '',
    department: '',
    phone: '',
    admissionDate: new Date(),
  });

  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, admissionDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*called postData  from api.js to send data to backend*/
      const response = await postData('receptionists', formData);  
      /* backend endpoint*/
      setSuccessMessage('Patient registered successfully!');
      console.log('Form Data Submitted:', response);
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientgender">Gender</label>
              <select
                id="patientGender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>Select Gender</option>
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
              />
            </div>
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientDepartment">Department</label>
              <select
                id="patientDepartment"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="" disabled>Select department</option>
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
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="admissionDate">Entry Date</label>
              <DatePicker
                selected={formData.admissionDate}
                onChange={handleDateChange}
                className="date-picker"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>

          {apiError && <p className="error-message">{apiError}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Reception;
