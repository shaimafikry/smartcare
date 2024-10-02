import React, { useState } from "react";
import "./Login.css";
import Joi from "joi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
   // Initialize errors as an empty object
  const [errors, setErrors] = useState({});

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
      "string..email": "Please enter a valid email address",
      "string.max": "Email can't be longer than 15 characters",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password can't be longer than 15 characters",
      "any.required": "Password is required",
    }),
  });

  const submitForm = (e) => {
    e.preventDefault();
   
    // Validate user data
    const { error } = schema.validate(user, { abortEarly: false });

    if (error) {
      // Store validation errors
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.context.key] = err.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Form submitted successfully:", user);
      //Send the valid data to the server
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src={`${process.env.PUBLIC_URL}/images/Smart_care-logo.png`} alt="Logo" />
        </div>
        <h2 className="login-header">login</h2>

        <form onSubmit={submitForm}>
          <div className="input-group">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInputChange}
              
              className="input-field"
            />
            {/* Display error for username */}
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              
              className="input-field"
            />
            <span className="toggle-password" onClick={togglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
            {/* Display error for password */}
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

        <a href="/forgot-password" className="forgot-password">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

export default Login;
