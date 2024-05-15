import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';
import "./MainPage.css";

const RequestList = () => {
  const [latestRepair, setLatestRepair] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedPrice, setEditedPrice] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  useEffect(() => {
    fetchLatestRepair();
  }, []);

  const fetchLatestRepair = async () => {
    try {
      let q = collection(db, 'RepairRequest');

      // Apply status filter if selected
      if (filterStatus) {
        q = query(q, where('status', '==', filterStatus));
      }

      // Apply search filter if searchQuery is not empty
      if (searchQuery) {
        // Convert searchQuery to lowercase for case-insensitive search
        const searchTerm = searchQuery.toLowerCase();
        // Add a where clause to filter by the Model property
        q = query(q, where('Model', '>=', searchTerm), where('Model', '<=', searchTerm + '\uf8ff'));
      }

      const querySnapshot = await getDocs(q);
      const repairList = [];
      querySnapshot.forEach((doc) => {
        repairList.push({ id: doc.id, ...doc.data() });
      });
      setLatestRepair(repairList);
    } catch (error) {
      console.error('Error fetching repair requests:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setEditedPrice(request.price || '200dh');
    setEditedStatus(request.status);
    setEditModalVisible(true);
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteDoc(doc(db, 'RepairRequest', id));
      console.log('Request deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const requestRef = doc(db, 'RepairRequest', selectedRequest.id);
      await updateDoc(requestRef, { price: editedPrice, status: editedStatus });

      console.log('Request updated successfully:', selectedRequest.id);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const generateQRCodeData = (request) => {
    if (request.status === 'completed') {
      const qrCodeData = [
        'Best Info Tech',
        `Client Name: ${request.clientName}`,
        `Email: ${request.email}`,
        `Address: ${request.address}`,
        `Device: ${request.device}`,
        `Model: ${request.Model}`,
        `Repair Type: ${request.repairType}`,
        `Total Price: ${request.price}`
      ];
      return qrCodeData.join('\n');
    }
    return null;
  };

  const renderQRCode = (request) => {
    const qrData = generateQRCodeData(request);
    if (qrData) {
      return (
        <QRCode
          value={qrData}
          style={{
            border: '2px solid #000',
            borderRadius: '10px',
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="container mt-4">
      {/* Search bar */}
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-2 ml-5 " style={{ marginRight: "250px", marginLeft: "250px", height: "30px" }}>
        <div className="input-group">
        <input
            type="search"
            placeholder="Search by Model"
            aria-describedby="button-addon1"
            className="form-control border-0  bg-light"
            style={{ paddingLeft: 200, width: "300px" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {/* Filter bar */}
      <div className="d-flex">
        <div className='p-2 flex-grow-1' style={{ marginTop: '80px' }}>
          <label htmlFor="statusFilter" className="form-label" >Filter by Status:</label>
          <select
            style={{ width: '400px', padding: '5px', borderRadius: '10px', borderColor: 'grey', marginLeft: '5px' }}
            id="statusFilter"
            className="status-select"
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Edit modal */}
      {editModalVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Request</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginLeft: '300px' }} onClick={() => setEditModalVisible(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="editedPrice">Price</label>
                    <input type="text" className="form-control" id="editedPrice" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editedStatus">Status</label>
                    <select className="form-control" id="editedStatus" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="in progress">In progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{ backgroundColor: 'grey', width: '200px', paddingTop: '2px' }} onClick={() => setEditModalVisible(false)}>Close</button>
                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#8B322C', borderColor: '#8B322C', width: '200px', marginRight: '30px', paddingTop: '2px' }} onClick={handleSaveChanges}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Repair request list */}
      <div style={{ maxHeight: "350px", overflowY: "auto" }}>
        <table className='table table-hover shadow p-1 mb-4 bg-body rounded' style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Model</th>
              <th>Repair Type</th>
              <th>Description</th>
              <th>Client</th>
              <th>Status</th>
              <th>Price</th>
              <th>Action</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {latestRepair.map((request) => (
              <tr key={request.id}>
                <td>{request.device}</td>
                <td>{request.Model}</td>
                <td>{request.repairType}</td>
                <td>{request.description}</td>
                <td>{request.clientName}</td>
                <td>
                  <div className="status" style={{ backgroundColor: getStatusColor(request.status) }}>{request.status}</div>
                </td>
                <td>{request.price || '200dh'}</td>
                <td>
                  <FontAwesomeIcon icon={faEdit} style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleEditRequest(request)} />
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#8B322C', marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleDeleteRequest(request.id)} />
                </td>
                <td>
                  {request.status === 'completed' && renderQRCode(request)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'greenyellow';
    case 'pending':
      return '#FF9999';
    case 'in progress':
      return '#5BBCFF';
    default:
      return '';
  }
};

export default RequestList;
