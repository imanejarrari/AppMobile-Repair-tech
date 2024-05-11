import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import repairLogo from '../assests/repairLogo.png';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; 
import './Auth.css';

const SignUpForm = ({ setisLoggedIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [authMode, setAuthMode] = useState('signin'); 
  
  const changeAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === 'signin' ? 'signup' : 'signin'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add user data directly to Firestore
      const docRef = await addDoc(collection(db, 'users'), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      toast.success('Congratulations! Your account has been successfully created!');
      setisLoggedIn(true);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '', // Remove password field from the state update
      });
    } catch (error) {
      console.error('Signup error:', error.message);
      setErrors({ general: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div className="Auth-form-container">
      <div className="main-container">
        <img
          src={repairLogo}
          alt="Logo"
          style={{ marginTop: '50%', width: 340, marginLeft: '10%' }}
        />
      </div>
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{authMode === 'signin' ? 'Sign In' : 'Sign Up'}</h3>

          <div className="text-center">
            {authMode === 'signin' ? (
              <span style={{ fontWeight: 400, color: 'grey' }}>
                Not registered yet?{' '}
                <span className="link" style={{ color: '#8B322C' }} onClick={changeAuthMode}>
                  Sign Up
                </span>
              </span>
            ) : (
              <span style={{ fontWeight: 400, color: 'grey' }}>
                Already registered?{' '}
                <span className="link" onClick={changeAuthMode}>
                  Sign In
                </span>
              </span>
            )}
          </div>

          {authMode === 'signup' && (
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleInputChange}
                className="form-control mt-1"
                placeholder="e.g Jane"
              />
            </div>
          )}

          {authMode === 'signup' && (
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleInputChange}
                className="form-control mt-1"
                placeholder="e.g Doe"
              />
            </div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Enter email"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#8B322C', paddingTop: '1%', color: 'white' }}
            >
              {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
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
