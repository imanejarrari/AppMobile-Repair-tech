import React, { useState } from 'react';
import {  toast ?ToastContainer } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; 
import './AddTechnicianForm.css';
import 'react-toastify/dist/ReactToastify.css';


const AddTechnicianForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    phoneNumber: '',
    Specialization: '',
    Availability: true,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add technician data to Firestore
      await addDoc(collection(db, 'technicians'), {
        Name: formData.Name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        Specialization: formData.Specialization,
        Availability: formData.Availability,
      });

    

      toast.success('New technician added successfully!');

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit();
      }

      // Reset form fields
      setFormData({
        Name: '',
        email: '',
        phoneNumber: '',
        Specialization: '',
        Availability: true,
      });
    } catch (error) {
      console.error('Error adding technician:', error.message);
      setErrors({ general: 'An error occurred. Please try again later.' });
    }
  };


  return (
    <div className="container-wrapper">
      <form onSubmit={handleSubmit} className="AddTechnicianForm">
        <div className="container mb-2 border border-2 rounded-4 shadow mt-1" style={{ width: "500px"}}>
          <h3 className="text-center rounded-pill border-bottom border-dark-subtle mt-1">Add Technician</h3>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              value={formData.Name}
              onChange={handleInputChange}
              name="Name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
            <input
              type="tel"
              className="form-control"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Specialization" className="form-label">Specialization:</label>
            <input
              type="text"
              className="form-control"
              value={formData.Specialization}
              onChange={handleInputChange}
              name="Specialization"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Availability"
              checked={formData.Availability}
              onChange={(e) => setFormData((prevData) => ({ ...prevData, availability: e.target.checked }))}
            />
            <label className="form-check-label" htmlFor="availability">Available</label>
          </div>
          <button type="submit" className="btn btn-primary mb-3  w-100" style={{backgroundColor:'#8B322C' , borderColor:'#8B322C' ,height:'35px' }}>Add Technician</button>
        </div>
      </form>

      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

    </div>
    
  );
};

export default AddTechnicianForm;
