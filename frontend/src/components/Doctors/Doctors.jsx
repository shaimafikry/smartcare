import React from 'react';
import './Doctors.css';

const Doctor = () => {
 
  const patients = [
    {
      name: 'John Doe',
      age: 45,
      status: 'New',
      nationalID: '123456789',
      diagnosis: 'Fracture',
      entryDate: '2023-10-01'
    },
    {
      name: 'Jane Smith',
      age: 32,
      status: 'Resident',
      nationalID: '987654321',
      diagnosis: 'Headache',
      entryDate: '2023-09-15'
    }
  ];

  return (
    <div className="doctor-page">
      <h1 className="title">Patient Information</h1>
      <div className="patients-container">
        {patients.map((patient, index) => (
          <div key={index} className="patient-card">
            <div className="patient-info">
              <label>Name:</label>
              <span>{patient.name}</span>
              <small className={`status ${patient.status.toLowerCase()}`}>{patient.status}</small>
            </div>
            <div className="patient-info">
              <label>Age:</label>
              <span>{patient.age}</span>
            </div>
            <div className="patient-info">
              <label>National ID:</label>
              <span>{patient.nationalID}</span>
            </div>
            <div className="patient-info">
              <label>Diagnosis:</label>
              <span>{patient.diagnosis}</span>
            </div>
            <div className="patient-info">
              <label>Entry Date:</label>
              <span>{patient.entryDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctor;
