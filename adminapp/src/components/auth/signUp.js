import React, { useState } from 'react';
import { auth , db } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import repairLogo from '../assests/repairLogo.png';
import { collection } from 'firebase/firestore';
import './Auth.css';

const SignUpForm = ({ setisLoggedIn }) => {
  const [authMode, setAuthMode] = useState('signin');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});

  const changeAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === 'signin' ? 'signup' : 'signin'));
    setErrors({});
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    });
  };

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

      console.log('Creating user with email:', formData.email); // Log the email being used for user creation

      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      console.log('User created:', userCredential.user); // Log the user object returned after creation

      // Get the current user
      const user = userCredential.user;

      // Update user profile with first name and last name
      await user.updateProfile({
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      console.log('User profile updated:', user); // Log the user object after profile update

      // Save additional user information to Firestore
      await collection(db, 'users').doc(user.uid).set({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      console.log('User information saved to Firestore');

      toast.success('Congratulations! Your account has been successfully created!');
      setisLoggedIn(true);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
      });
    } catch (error) {
      console.error('Authentication error:', error); // Log the full error object for debugging
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
                value={formData.firstName}
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
                value={formData.lastName}
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
              value={formData.email}
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
              value={formData.password}
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
