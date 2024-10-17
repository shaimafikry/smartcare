import React, { useState, useEffect } from 'react';
import { fetchData, postData } from '../../api';
import { Modal, Button, Form } from 'react-bootstrap';
import './Profile.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Profile() {
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    NewPassword: '',
    ConfirmPassword: '',
  });

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await fetchData('/api/profile');
        setFormData(data);
      } catch (error) {
        setApiError('Failed to load data.');
      }
    };

    fetchPatientData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errorFields.includes(name)) {
      setErrorFields(errorFields.filter(field => field !== name));
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(formData).filter(field => !formData[field].trim());
    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      return;
    }

    try {
      const response = await postData('/api/profile', {
        Name: formData.Name,
        Age: formData.Age
      });
      setSuccessMessage('Profile updated successfully!');
      setApiError('');
      setShowEditProfileModal(false);
      console.log('Form Data Submitted:', response);
    } catch (error) {
      setApiError('Failed to update profile. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const { NewPassword, ConfirmPassword } = formData;

    if (!NewPassword || !ConfirmPassword) {
      setErrorFields(['NewPassword', 'ConfirmPassword']);
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      setApiError("Passwords do not match.");
      return;
    }

    try {
      // 
      // const response = await postData('/api/update-password', formData);
      setSuccessMessage('Password updated successfully!');
      setApiError('');
      setShowEditPasswordModal(false);
    } catch (error) {
      setApiError('Failed to update password. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="edit-profile">
      <Button className="custom-btn" onClick={() => setShowEditProfileModal(true)}>
        Edit Profile
      </Button>
      <Button className="custom-btn" onClick={() => setShowEditPasswordModal(true)}>
          Edit Password
       </Button>


      {/* Modal profile*/}
      <Modal show={showEditProfileModal} onHide={() => setShowEditProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitProfile}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
                className={errorFields.includes('Name') ? 'is-invalid' : ''}
              />
              {errorFields.includes('Name') && <span className="error-message">Required</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                required
                className={errorFields.includes('Age') ? 'is-invalid' : ''}
              />
              {errorFields.includes('Age') && <span className="error-message">Required</span>}
            </Form.Group>

            <Button type="submit" variant="danger">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal password*/}
      <Modal show={showEditPasswordModal} onHide={() => setShowEditPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitPassword}>
            
            <Form.Group className="mb-3 position-relative">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="NewPassword"
                value={formData.NewPassword}
                onChange={handleChange}
                required
                className={errorFields.includes('NewPassword') ? 'is-invalid' : ''}
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              {errorFields.includes('NewPassword') && <span className="error-message">Required</span>}
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={handleChange}
                required
                className={errorFields.includes('ConfirmPassword') ? 'is-invalid' : ''}
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              {errorFields.includes('ConfirmPassword') && <span className="error-message">Required</span>}
            </Form.Group>

            <Button type="submit" variant="danger">Save</Button>
          </Form>
          {apiError && <div className="error-message">{apiError}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
