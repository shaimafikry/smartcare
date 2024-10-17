import React, { useEffect, useState } from 'react';
import './Doctors.css';
import { fetchData } from '../../api';

const Doctors = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState('');

  // API
  const getPatients = async () => {
    try {
      const response = await fetchData('doctor/dashboard');
      setPatients(response);
    } catch (error) {
      setApiError('Failed to find patients data.');
      console.error('Error fetching patients:', error);
    }
  };

  // getPatients func
  useEffect(() => {
    getPatients();
  }, []);


  return (
    <div className="doctor-page">
      <div className="page-header">
        <h4>All Patients</h4>
      </div>
      {apiError && <p className="error-message">{apiError}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>National ID</th>
              <th>Age</th>
              <th>Diagnosis</th>
              <th>Entry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.national_id}</td>
                  <td>{patient.age}</td>
                  <td>{patient.PatientDetail.diagnosis}</td>
                  <td>{patient.state}</td>
                  <td>{patient.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No patient data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctors;