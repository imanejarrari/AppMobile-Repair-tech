import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const TechniciansList = () => {
  const [technicians, setTechnicians] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');

  useEffect(() => {
    fetchTechnicians();
  }, [searchQuery, filterAvailability]);

  const fetchTechnicians = async () => {
    try {
      let q = collection(db, 'technicians');

      // Apply specialization search filter
      if (searchQuery) {
        q = query(q, where('Specialization', '==', searchQuery));
      }

      // Apply availability filter
      if (filterAvailability) {
        q = query(q, where('Availability', '==', filterAvailability === 'Available'));
      }

      const querySnapshot = await getDocs(q);
      const technicianList = [];
      querySnapshot.forEach((doc) => {
        technicianList.push({ id: doc.id, ...doc.data() });
      });
      setTechnicians(technicianList);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleAvailabilityFilter = (availability) => {
    setFilterAvailability(availability);
  };

  const handleEdit = (technicianId) => {
    // Implement edit logic
    console.log('Edit technician:', technicianId);
  };

  const handleDelete = async (technicianId) => {
    try {
      await deleteDoc(doc(db, 'technicians', technicianId));
      console.log('Technician deleted successfully:', technicianId);
      // Optionally, update state or fetch technicians again after deletion
    } catch (error) {
      console.error('Error deleting technician:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="technicians-list-container">
        <h2>Technicians List</h2>
        <div className="search-filter-container">
          <input
            type="search"
            placeholder="Search by Specialization"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select
            value={filterAvailability}
            onChange={(e) => handleAvailabilityFilter(e.target.value)}
          >
            <option value="">Filter by Availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
          <table className='table table-hover shadow p-1 mb-4 bg-body rounded' style={{ fontSize: "14px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Specialization</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.id}>
                  <td>{technician.Name}</td>
                  <td>{technician.email}</td>
                  <td>{technician.phoneNumber}</td>
                  <td>{technician.Specialization}</td>
                  <td>{technician.Availability ? 'Available' : 'Not Available'}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => handleEdit(technician.id)} />
                    <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDelete(technician.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TechniciansList;
