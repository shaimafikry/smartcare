import React, { useEffect, useState } from 'react';
import './Doctors.css';
import { fetchData } from '../../api';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Doctors = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState('');
	// const [userDepartment, setUserDepartment] = useState('');
	const navigate = useNavigate(); // Get the navigate function
	const { department } = useParams();


	useEffect(() => {
  // API
		const getPatients = async () => {
			try {
				const response = await fetchData(`patients/${department}`);
				setPatients(response);
			} catch (error) {
				setApiError('Failed to find patients data.');
				console.error('Error fetching patients:', error);
			}
		};

		// getPatients func
		
			getPatients();
  }, [department]);

  // Handle row click and navigate to another page (e.g., /patients/:id)
  const handleRowClick = (patientId) => {
    navigate(`/patients/${patientId}/edit`); // Redirect to the new page using the patient ID
  };

  return (
    <div className="doctor-page">
      <div className="page-header">
        <h4> {department.charAt(0).toUpperCase() + department.slice(1)} Patients </h4>
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
              <th>Status</th>
              <th>Entry Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr key={index} onClick={() => handleRowClick(patient.id)} className="clickable-row">
                  <td>{patient.name}</td>
                  <td>{patient.national_id}</td>
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

export default Doctors;
