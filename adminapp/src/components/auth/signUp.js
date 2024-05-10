import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assests/logo.png';
import "./Auth.css";
const SignUpForm = ({ setisLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.password2) {
        setErrors({ password2: 'Passwords do not match' });
        return;
      }

      await auth.createUserWithEmailAndPassword(formData.email, formData.password);
      toast.success("Congratulations! Your account has been successfully created!");
      setisLoggedIn(true);

      setFormData({
        email: '',
        password: '',
        password2: '',
      });
    } catch (error) {
      console.error('Authentication error:', error.message);
      // Handle authentication errors (e.g., display error messages)
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'Email is already in use' });
      } else {
        setErrors({ general: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div className="Auth-form-container">

      <div className="main-container">
      </div>
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Enter email"
            />
            {errors.email && (<div className="text-danger">{errors.email}</div>)}
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
            {errors.password && (<div className="text-danger">{errors.password}</div>)}
          </div>

          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Confirm password"
            />
            {errors.password2 && (
              <div className="text-danger">{errors.password2}</div>
            )}
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>

          {errors.general && (
            <div className="text-danger mt-3">{errors.general}</div>
          )}
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SignUpForm;
