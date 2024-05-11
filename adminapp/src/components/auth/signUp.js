import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";

const SignUpForm = ({ setisLoggedIn }) => {
  const [authMode, setAuthMode] = useState('signin'); // Initialize authMode state to 'signin'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});

  const changeAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === 'signin' ? 'signup' : 'signin')); // Toggle authMode between 'signin' and 'signup'
    setErrors({});
    setFormData({
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
          <h3 className="Auth-form-title">
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h3>

          <div className="text-center">
            {authMode === 'signin' ? (
              <span style={{fontWeight:400 , color:'grey'}}>
                Not registered yet?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </span>
            ) : (
              <span style={{fontWeight:400 , color:'grey'}}>
                Already registered?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </span>
            )}
          </div>

          {authMode === 'signup' && (
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
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

          {authMode === 'signup' && (
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
          )}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
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
