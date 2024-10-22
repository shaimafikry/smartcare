import React, { useEffect, useState } from 'react';
import './AllPatients.css';
import { fetchData } from '../../api';
import { useNavigate } from 'react-router-dom';

const PatientAll = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState('');
	const navigate = useNavigate();
	

  const getPatients = async () => {
    try {
      const response = await fetchData('patients');
      setPatients(response);

    } catch (error) {
      setApiError('Failed to find patients data.');
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  const handleRowClick = (patientId) => {
    navigate(`/patients/${patientId}/edit`); // Redirect to the new page using the patient ID
  };

  return (
    <div className="doctor-page">
      <div className="page-header">
        <h4> All Patients </h4>
      </div>
      {apiError && <p className="error-message">{apiError}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Diagnosis</th>
              <th>Status</th>
              <th>Entry Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr key={index} onClick={() => handleRowClick(patient.id)} className="clickable-row">
                  <td>{patient.name}</td>
                  <td>{patient.department}</td>
                  <td>{patient.age}</td>
                  <td>{patient.PatientDetail?.diagnosis || "No Diagnosis"}</td>
                  <td>{patient.status}</td>
                  <td>{new Date(patient.createdAt).toLocaleDateString()}</td>
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

export default PatientAll;
