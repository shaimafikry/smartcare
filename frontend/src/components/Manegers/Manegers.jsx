import React, { useEffect, useState }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Manegers.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { postData, fetchData } from '../../api';

const Manegers = () => {
    const [newUserFormVisible, setNewUserFormVisible] = useState(false);
    const [role, setUserRole] = useState('');
    const [name, setUserName] = useState('');
    const [age, setUserAge] = useState('');
    const [gender, setUserGender] = useState('');
    const [national_id, setUserNationalID] = useState('');
    const [password, setUserPassword] = useState('');
    const [phone, setUserPhone] = useState('');
    const [email, setUserEmail] = useState('');
    const [department, setUserDepartment] = useState('');
    
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
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const data = await fetchData('users');
            setNurses(data.nurses);
            setManegers(data.managers);
            setDoctors(data.doctors);
            setReceptionists(data.receptionists);
        } catch (error) {
            console.error("Error fetching data");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            role,
            name,
            password,
            phone,
            email,
            department,
            age,
            gender,
            national_id,
        };

        try {
            const response = await postData('users', formData); 
              console.log(response);
            setSuccessMessage('User registered successfully!'); 
            setUserRole('');
            setUserName('');
            setUserAge('');
            setUserGender('');
            setUserNationalID('');
            setUserPassword('');
            setUserPhone('');
            setUserEmail('');
            setUserDepartment('');
        } catch (error) {
            setApiError('Failed to register user'); 
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
                    <i className='fa fa-plus'></i>  New User
                    <small className="description">Create new user</small>
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
                    <div className="modal fade show" style={{ display: 'block' }} onClick={handleCloseModal} centered>
                        <div className="modal-dialog-m" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-header-m">
                                    <h5 className="modal-title-m"> New User</h5>
                                    <button type="button" className="close-m" onClick={handleCloseModal}>
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group-m">
                                            <label htmlFor="userName">Name</label>
                                            <input
                                                type="text"
                                                className="form-control-m"
                                                id="userName"
                                                value={name}
                                                onChange={(e) => setUserName(e.target.value)}
                                                placeholder="Enter name"
                                            />
                                        </div>
                                        <div className="form-group-m">
                                            <label htmlFor="userAge">Age</label>
                                            <input
                                                type="text"
                                                className="form-control-m"
                                                id="userAge"
                                                value={age}
                                                onChange={(e) => setUserAge(e.target.value)}
                                                placeholder="Enter Age"
                                            />
                                        </div>
                                        <div className="form-group-m">
                                            <label htmlFor="userGender">Gender</label>
                                            <select
                                               className="form-control-m"
                                               id="userGender"
                                               value={gender}
                                               onChange={(e) => setUserGender(e.target.value)}
                                             >
                                              <option value="" disabled selected>
                                                   Select...
                                                     </option>
                                              <option value="Male">Male</option>
                                              <option value="Female">Female</option>
                                            </select>
                                        </div>

                                        <div className="form-group-m">
                                            <label htmlFor="userId">Password</label>
                                            <input
                                                type="password"
                                                className="form-control-m"
                                                id="userPassword"
                                                value={password}
                                                onChange={(e) => setUserPassword(e.target.value)}
                                                placeholder="Enter password"
                                            />
                                        </div>
                                        <div className="form-group-m">
                                            <label htmlFor="userType">Role</label>
                                            <select
                                                className="form-control-m"
                                                id="userType"
                                                value={role}
                                                onChange={(e) => setUserRole(e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    Select...
                                                </option>
                                                <option value="nurse">Nurse</option>
                                                <option value="receptionist">Receptionist</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="manager">Manager</option>
                                            </select>
                                        </div>
                                        <div className="form-group-m">
                                            <label htmlFor="userPhone">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control-m"
                                                id="userPhone"
                                                value={phone}
                                                onChange={(e) => setUserPhone(e.target.value)}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        <div className="form-group-m">
                                            <label htmlFor="userNationalID">National-ID</label>
                                            <input
                                                type="text"
                                                className="form-control-m"
                                                id="userNationalID"
                                                value={national_id}
                                                onChange={(e) => setUserNationalID(e.target.value)}
                                                placeholder="Enter National-ID"
                                            />
                                        </div>
                                        <div className="form-group-m">
                                            <label htmlFor="userEmail">Email</label>
                                            <input
                                                type="text"
                                                className="form-control-m"
                                                id="userEmail"
                                                value={email}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                placeholder="Enter Email"
                                            />
                                        </div>
                                        <div className="form-group-m">
                                            <label htmlFor="userDepartment">Department</label>
                                                <select
                                                className="form-control-m"
                                                id="Department"
                                                value={department} 
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
                <Modal show={showNurseModal} onHide={() => setShowNurseModal(false)} centered>
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
                <Modal show={showDoctorModal} onHide={() => setShowDoctorModal(false)} centered>
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
                <Modal show={showReceptionistModal} onHide={() => setShowReceptionistModal(false)} centered>
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
                <Modal show={showManegerModal} onHide={() => setShowManegersModal(false)} centered>
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
