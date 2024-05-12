import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import './MainPage.css';


const RequestList = () => {
  const [latestRepair, setLatestRepair] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // Initialize status filter state

  useEffect(() => {
    fetchLatestRepair();
  }, [searchQuery, filterStatus]);

  const fetchLatestRepair = async () => {
    try {
      let q = collection(db, 'RepairRequest');

      // Apply search filter
      if (searchQuery) {
        q = query(q, orderBy('Model'), where('Model', '==', searchQuery));
      }

      // Apply status filter
      if (filterStatus && filterStatus !== 'All') {
        q = query(q, orderBy('status'), where('status', '==', filterStatus));
      }

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestRepairData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLatestRepair(latestRepairData);
      } else {
        setLatestRepair([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching latest repair request:', error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
  };

  const getStatusCellStyle = (status) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: 'greenyellow', color: 'white' };
      case 'pending':
        return { backgroundColor: '#FF9999', color: 'white'  ,paddingLeft:'25px'};
        case 'in progress':
        return { backgroundColor: '#5BBCFF', color: 'white' };
      default:
        return {};
    }
  };

  return (
    <div className="container mt-4">
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-2 ml-5 " style={{ marginRight: "250px", marginLeft: "250px", height: "30px" }}>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search by Model"
            aria-describedby="button-addon1"
            className="form-control border-0  bg-light"
            style={{ paddingLeft: 200, width: "300px" }}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex">
        <div className='p-2 flex-grow-1' style={{marginTop:'80px'}}>
          <label htmlFor="statusFilter" className="form-label" >Filter by Status:</label>
          <select
          style={{width:'400px' , padding:'5px' , borderRadius:'10px' , borderColor:'grey' , marginLeft:'5px'}}
            id="statusFilter"
            className="status-select"
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div style={{ maxHeight: "350px", overflowY: "auto" }}>
        <table className='table table-hover shadow p-1 mb-4 bg-body rounded' style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Model</th>
              <th>Repair Type</th>
              <th>Description</th>
              <th>Client</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
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
                <td>{request.email}</td>
                <td> 
                 <div style={getStatusCellStyle(request.status)} className='stt'>{request.status}</div>
                </td>
                <td>anyway</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;
