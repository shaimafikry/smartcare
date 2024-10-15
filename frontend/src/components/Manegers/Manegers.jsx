import React, { useEffect, useState }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Manegers.css'; 
import { Button, Modal, Table } from 'react-bootstrap';
import { postData } from '../../api';

const Manegers = () => {
    const [newUserFormVisible, setNewUserFormVisible] = useState(false);
    const [userType, setUserType] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userSpecialty, setUserSpecialty] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [nurses, setNurses] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [receptionists, setReceptionists] = useState([]);
    const [manegers, setManegers] = useState([]);
    const [showNurseModal, setShowNurseModal] = useState(false);
    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const [showReceptionistModal, setShowReceptionistModal] = useState(false);
    const [showManegerModal, setShowManegersModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const nursesResponse = await fetch("http://localhost:5000/api/nurses");
            const doctorsResponse = await fetch("http://localhost:5000/api/doctors");
            const receptionistsResponse = await fetch("http://localhost:5000/api/receptionists");
            const ManegersResponse = await fetch("http://localhost:5000/api/manegers");

            const nursesData = await nursesResponse.json();
            const doctorsData = await doctorsResponse.json();
            const receptionistsData = await receptionistsResponse.json();
            const manegersData = await ManegersResponse.json();
            
            setNurses(nursesData);
            setManegers(manegersData);
            setDoctors(doctorsData);
            setReceptionists(receptionistsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            userType,
            userName,
            userPassword,
            userPhone,
            userSpecialty,
            userDepartment,
        };

        try {
            const response = await postData('users', formData); 
              console.log(response);
            setSuccessMessage('User registered successfully!'); 
            setUserType('');
            setUserName('');
            setUserPassword('');
            setUserPhone('');
            setUserSpecialty('');
            setUserDepartment('');
        } catch (error) {
            setApiError('Failed to register user. Please try again.'); 
        }
    };

    const handleCloseModal = () => {
        setNewUserFormVisible(false);
        setApiError(''); 
        setSuccessMessage(''); 
    };

    return (
        <div className="d-flex">
            <div className="container content">
                <div className="row">
                    <div className="row-md-3 ">
                    <div className="admin-container d-flex flex-column align-items-start">
            <div className="mb-4">
                <button className="btn custom-btn-new" onClick={() => setNewUserFormVisible(true)}>
                    Add New User
                    <small className="description">Create and editing new user </small>
                </button>
            </div>
            <div className="d-flex flex-column align-items-start">
                <button className="btn custom-btn-manag mb-3" onClick={() => setShowNurseModal(true)}>
                    Nurses List
                    <small className="description">View and manage nurses</small>
                </button>
                <button className="btn custom-btn-manag mb-3" onClick={() => setShowDoctorModal (true)}>
                    Doctors List
                    <small className="description">View and manage doctors</small>
                </button>
                <button className="btn custom-btn-manag mb-3" onClick={() => setShowReceptionistModal(true)}>
                    Receptionists List
                    <small className="description">View and manage receptionists</small>
                </button>
                <button className="btn custom-btn-manag mb-3" onClick={() => setShowManegersModal(true)}>
                    Managers List
                    <small className="description">View and manage managers</small>
                </button>
            </div>
        </div>
    </div>
        
                {newUserFormVisible && (
                    <div className="modal fade show" style={{ display: 'block' }} onClick={handleCloseModal}>
                        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New User</h5>
                                    <button type="button" className="close" onClick={handleCloseModal}>
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="userName">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userName"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                placeholder="Enter name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userId">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="userPassword"
                                                value={userPassword}
                                                onChange={(e) => setUserPassword(e.target.value)}
                                                placeholder="Enter password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userType">User Role</label>
                                            <select
                                                className="form-control-user"
                                                id="userType"
                                                value={userType}
                                                onChange={(e) => setUserType(e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    Select...
                                                </option>
                                                <option value="Nurses">Nurses</option>
                                                <option value="Receptionists">Receptionists</option>
                                                <option value="Doctors">Doctors</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userPhone">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userPhone"
                                                value={userPhone}
                                                onChange={(e) => setUserPhone(e.target.value)}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userSpecialty">Specialty</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userSpecialty"
                                                value={userSpecialty}
                                                onChange={(e) => setUserSpecialty(e.target.value)}
                                                placeholder="Enter specialty"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userDepartment">Department</label>
                                                <select
                                                className="form-control-user"
                                                id="Department"
                                                value={userDepartment} 
                                                onChange={(e) => setUserDepartment(e.target.value)} 
                                                >
                                                    <option value="" disabled selected>
                                                        Select...
                                                    </option>
                                                    <option value="emergency">Emergency</option>
                                                    <option value="surgery">Surgery</option>
                                                    <option value="pediatrics">Pediatrics</option>
                                                    <option value="orthopedics">Orthopedics</option>
                                                    <option value="cardiology">Cardiology</option>
                                                    <option value="neurology">Neurology</option>
                                                    <option value="radiology">Radiology</option>
                                                </select>
                                        </div>

                                        <button type="submit" className="btn btn-maneger-submit">
                                            Submit
                                        </button>
                                    </form>
                                    {apiError && <div className="text-danger">{apiError}</div>}
                                    {successMessage && <div className="text-success">{successMessage}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for nurses */}
                <Modal show={showNurseModal} onHide={() => setShowNurseModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nurses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nurses.map((nurse) => (
                                    <tr key={nurse.id}>
                                        <td>{nurse.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowNurseModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal for doctors */}
                <Modal show={showDoctorModal} onHide={() => setShowDoctorModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Doctors</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id}>
                                        <td>{doctor.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDoctorModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal for receptionists */}
                <Modal show={showReceptionistModal} onHide={() => setShowReceptionistModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Receptionists</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receptionists.map((receptionist) => (
                                    <tr key={receptionist.id}>
                                        <td>{receptionist.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowReceptionistModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal for managers */}
                <Modal show={showManegerModal} onHide={() => setShowManegersModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Managers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manegers.map((maneger) => (
                                    <tr key={maneger.id}>
                                        <td>{maneger.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowManegersModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    </div>
    );
};

export default Manegers;
