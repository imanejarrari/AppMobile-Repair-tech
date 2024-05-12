import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const TechniciansList = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      const querySnapshot = await getDocs(collection(db, 'technicians'));
      const technicianList = [];
      querySnapshot.forEach((doc) => {
        technicianList.push({ id: doc.id, ...doc.data() });
      });
      setTechnicians(technicianList);
    };

    fetchTechnicians();
  }, []);

  return (
    <div className="technicians-list-container">
      <h2>Technicians List</h2>
      <div className="technicians-list">
        {technicians.map((technician) => (
          <div key={technician.id} className="technician-card">
            <div className="technician-details">
              <h3>{technician.name}</h3>
              <p>Email: {technician.email}</p>
              <p>Phone Number: {technician.phoneNumber}</p>
              <p>Specialization: {technician.specialization}</p>
              <p>Availability: {technician.availability ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechniciansList;
