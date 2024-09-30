import React, { useState } from 'react';
import './NewPatientForm.css';

const NewPatientForm = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container content">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button className="btn btn-primary new-patient-btn" onClick={toggleForm}>+ New Patient</button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="container mt-4" id="newPatientForm">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form method="POST" action="/dashboard/receptionist">
                <div className="form-group">
                  <label htmlFor="patientName">Name</label>
                  <input type="text" className="form-control" id="patientName" name="pt_name" placeholder="Enter name" />
                </div>
                <div className="form-group">
                  <label htmlFor="patientSex">Sex</label>
                  <select className="form-control" id="patientSex" name="pt_sex">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="patientAge">Age</label>
                  <input type="text" className="form-control" id="patientAge" name="pt_age" placeholder="Enter Age" />
                </div>
                <div className="form-group">
                  <label htmlFor="patientDepartment">Department</label>
                  <select className="form-control" id="patientDepartment" name="pt_department">
                    <option>Emergency</option>
                    <option>Bones</option>
                    <option>Nursery</option>
                    <option>Brain</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="patientID">National ID</label>
                  <input type="text" className="form-control" id="patientID" name="pt_nat_id" placeholder="Enter National ID" />
                </div>
                <div className="form-group">
                  <label htmlFor="patientAddress">Address</label>
                  <input type="text" className="form-control" id="patientAddress" name="pt_address" placeholder="Enter address" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPatientForm;
