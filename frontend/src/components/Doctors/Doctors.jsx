import React, { useEffect, useState } from 'react';
import './Doctors.css';

const Doctors = () => {
  const [patients, setPatients] = useState([]);

 
  const fetchPatients = async () => {
    try {
      const response = await fetch(''); 
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="doctor-page">
      <h2>Patient Records</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>National ID</th>
              <th>Age</th>
              <th>Diagnosis</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.nationalId}</td>
                <td>{patient.age}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctors;
