import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./tech.css";

const TechniciansList = () => {
  const [technicians, setTechnicians] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [editedTechnician, setEditedTechnician] = useState({
    Name: '',
    email: '',
    phoneNumber: '',
    Specialization: '',
    Availability: false
  });

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

  const handleAvailabilityFilter = (Availability) => {
    setFilterAvailability(Availability);
  };

  const handleEdit = (technicianId) => {
    const selectedTech = technicians.find(tech => tech.id === technicianId);
    setSelectedTechnician(selectedTech);
    setEditedTechnician(selectedTech);
    setEditModalVisible(true);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Availability') {
      setEditedTechnician({ ...editedTechnician, [name]: value === 'true' });
    } else {
      setEditedTechnician({ ...editedTechnician, [name]: value });
    }
  };
  
  const handleSaveChanges = async () => {
    try {
      const technicianRef = doc(db, 'technicians', selectedTechnician.id);
      await updateDoc(technicianRef, editedTechnician);
      console.log('Technician updated successfully:', selectedTechnician.id);
      setEditModalVisible(false);
      // Optionally, update state or fetch technicians again after updating
    } catch (error) {
      console.error('Error updating technician:', error);
    }
  };

  return (
    <div className="container mt-4">
      {editModalVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Technician</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setEditModalVisible(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="technicianName">Name</label>
                    <input type="text" className="form-control" id="technicianName" name="Name" value={editedTechnician.Name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="technicianEmail">Email</label>
                    <input type="email" className="form-control" id="technicianEmail" name="email" value={editedTechnician.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="technicianPhoneNumber">Phone Number</label>
                    <input type="tel" className="form-control" id="technicianPhoneNumber" name="phoneNumber" value={editedTechnician.phoneNumber} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="technicianSpecialization">Specialization</label>
                    <input type="text" className="form-control" id="technicianSpecialization" name="Specialization" value={editedTechnician.Specialization} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="technicianAvailability">Availability</label>
                    <select className="form-control" id="technicianAvailability" name="Availability" value={editedTechnician.Availability.toString()} onChange={handleInputChange}>
                              <option value="true">Available</option>
                               <option value="false">Not Available</option>
                    </select>

                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"style={{backgroundColor:'grey'}} onClick={() => setEditModalVisible(false)}>Close</button>
                <button type="button" className="btn btn-primary" style={{backgroundColor:'#8B322C' , borderColor:'#8B322C'}} onClick={handleSaveChanges}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      <div className="technicians-list-container">
        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-2 ml-5 " style={{ marginRight: "250px", marginLeft: "250px", height: "30px" }}>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search by Specialization"
              aria-describedby="button-addon1"
              className="form-control border-0  bg-light"
              style={{ paddingLeft: 200, width: "300px" }}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className='p-2 flex-grow-1' style={{ marginTop: '50px' }}>
            <select
              style={{ width: '400px', padding: '5px', borderRadius: '10px', borderColor: 'grey', marginLeft: '5px' }}
              value={filterAvailability}
              onChange={(e) => handleAvailabilityFilter(e.target.value)}
            >
              <option value="" style={{ color: 'grey' }}>Filter by Availability</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
        </div>
        {/* Technicians list */}
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
    <tr key={technician.id} style={{ backgroundColor: technician.Availability ? 'transparent' : '#FF9999' }}>
      <td>{technician.Name}</td>
      <td>{technician.email}</td>
      <td>{technician.phoneNumber}</td>
      <td>{technician.Specialization}</td>
      <td>{technician.Availability ? 'Available' : 'Not Available'}</td>
      <td>
        <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} className="edit-icon" onClick={() => handleEdit(technician.id)} />
        <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '15px' }} className="delete-icon" onClick={() => handleDelete(technician.id)} />
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
