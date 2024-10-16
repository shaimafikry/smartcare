import React, { useEffect, useState } from 'react';
import './AllPatients.css';
import { fetchData } from '../../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import { decodeJWT } from '../../utils';

const PatientAll = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState('');
	// const [department, setDepartment] = useState('');
	const navigate = useNavigate(); // Get the navigate function

  // API
  const getPatients = async () => {
    try {
      const response = await fetchData('patients');
      setPatients(response);
			// const user = decodeJWT(localStorage.getItem('token'))

			// console.log('user in edit patient profile page', user);
			// setDepartment(user.department);
    } catch (error) {
      setApiError('Failed to find patients data.');
      console.error('Error fetching patients:', error);
    }
  };

  // getPatients func
  useEffect(() => {
    getPatients();
  }, []);

  // Handle row click and navigate to another page (e.g., /patients/:id)
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
                  <td>{patient.PatientDetail?.diagnosis || "Not Yet Diagnosis"}</td>
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
