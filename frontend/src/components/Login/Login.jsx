import React, { useState } from "react";
import "./Login.css";
import Joi from "joi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { postData } from "../../api";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
	const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');   
  const [successMessage, setSuccessMessage] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Joi validation schema
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "string.max": "Email can't be longer than 15 characters",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password can't be longer than 20 characters",
      "any.required": "Password is required",
    }),
  });

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate user data
    const { error } = schema.validate(user, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.context.key] = err.message;
      });
      setErrors(newErrors);
			setApiError(''); // Clear API error if validation fails
    } else {
      setErrors({});
      setApiError('');
      setSuccessMessage('');
      
      try {
        /*postData for login */
        const data = await postData('login', user);
				console.log(user);
				console.log("token after signin", data.token);  // Make sure it's a valid JWT (header.payload.signature)
				sessionStorage.setItem('token', data.token);

				console.log('Token stored successfully:', data.token);
        /*endpoint 'login'*/
        setSuccessMessage('Login successful!');
        console.log("Login successful:", data);
				console.log("Redirecting to:", data.redirectUrl);
				navigate(data.redirectUrl);

      } catch (error) {
				console.error("Error caught during login:", error);
					// Server responded with a status other than 200 range
				setApiError(error.message || 'An unexpected error occurred during signin');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`} alt="Logo" />
        </div>
        <h2 className="login-header">Login</h2>

        <form onSubmit={submitForm}>
          <div className="input-group-login">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInputChange}
              className="input-field-login"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group-login password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              className="input-field-login"
            />
            <span className="toggle-password" onClick={togglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="remember-me">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {apiError && <p className="error-message">{apiError}</p>} {/* Show API error message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

      </div>
    </div>
  );
}

export default Login;
