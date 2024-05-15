import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Meeting.css';

// Function to check if the meeting date is within the selected date range
const checkDateRange = (meetingDate, startDate, endDate) => {
  if (!startDate || !endDate) return true; // If no start or end date selected, return true
  return meetingDate >= startDate && meetingDate <= endDate;
};

const MeetingRequestsList = () => {
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedMeeting, setEditedMeeting] = useState(null);

  useEffect(() => {
    fetchMeetingRequests();
  }, []);

  const fetchMeetingRequests = async () => {
    try {
      const meetingRequestsList = [];
      const meetingRequestsRef = collection(db, 'MeetingRequests');
      const q = query(meetingRequestsRef);

      const querySnapshot = await getDocs(q);
      
      for (const docSnapshot of querySnapshot.docs) {
        const meetingRequestData = docSnapshot.data();
        // Fetch technician's name based on technicianId
        const technicianDoc = await getDoc(doc(db, 'technicians', meetingRequestData.technicianId));
        const technicianData = technicianDoc.data();
        const meetingRequestWithTechnicianName = {
          id: docSnapshot.id,
          fullName: meetingRequestData.fullName,
          reason: meetingRequestData.reason,
          meetingDate: meetingRequestData.meetingDate,
          meetingTime: meetingRequestData.meetingTime,
          status: meetingRequestData.status,
          technicianName: technicianData ? technicianData.Name : 'Unknown Technician'
        };
        meetingRequestsList.push(meetingRequestWithTechnicianName);
      }
      setMeetingRequests(meetingRequestsList);
    } catch (error) {
      console.error('Error fetching meeting requests:', error);
    }
  };

  const filteredMeetingRequests = meetingRequests.filter((meetingRequest) => {
    const fullNameMatch = meetingRequest.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const technicianNameMatch = meetingRequest.technicianName.toLowerCase().includes(searchQuery.toLowerCase());
    const dateMatch = checkDateRange(meetingRequest.meetingDate, startDate, endDate);
    return (fullNameMatch || technicianNameMatch) && dateMatch;
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCancelMeeting = async (id) => {
    try {
      await deleteDoc(doc(db, 'MeetingRequests', id));
      console.log('Meeting request canceled successfully:', id);
      fetchMeetingRequests(); // Refresh the meeting requests list
    } catch (error) {
      console.error('Error canceling meeting request:', error);
    }
  };

  const handleAcceptMeeting = async (id) => {
    try {
      const requestRef = doc(db, 'MeetingRequests', id);
      await updateDoc(requestRef, { status: 'accepted' });
      console.log('Meeting request accepted successfully:', id);
      fetchMeetingRequests(); // Refresh the meeting requests list
    } catch (error) {
      console.error('Error accepting meeting request:', error);
    }
  };

  const handleEditMeeting = (meeting) => {
    setEditedMeeting(meeting);
    setIsModalOpen(true);
  };

  // Function to update meeting details
  const handleSaveChanges = async () => {
    try {
      const { id, meetingDate, meetingTime } = editedMeeting;
      const requestRef = doc(db, 'MeetingRequests', id);
      await updateDoc(requestRef, { meetingDate, meetingTime });
      console.log('Meeting details updated successfully:', id);
      fetchMeetingRequests(); // Refresh the meeting requests list
      setIsModalOpen(false);
      setEditedMeeting(null);
    } catch (error) {
      console.error('Error updating meeting details:', error);
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'greenyellow';
      case 'canceled':
        return '#FF9999';
      default:
        return 'transparent';
    }
  };

  return (
    <div className="container mt-4">
      <div className="meeting-requests-list-container">
        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-2 ml-5 " style={{ marginRight: "250px", marginLeft: "250px", height: "30px",paddingLeft:"100px"}}>
          <input
            type="text"
            placeholder="Search by client's name or technician's name"
            style={{paddingLeft:"100px",paddingTop:'1px'}}
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control border-0 bg-light"
          />
        </div>
        <div className='p-2 flex-grow-1' style={{ marginTop: '80px' }}>
          <div className="date-filter">
            <label htmlFor="startDate" style={{color:'grey'}}>Start Date:</label>
            <input type="date" id="startDate" style={{width:'200px'}} value={startDate} onChange={handleStartDateChange} />
            <label htmlFor="endDate" style={{color:'grey',marginLeft:'10px'}}>End Date:</label>
            <input type="date" id="endDate" style={{width:'200px'}} value={endDate} onChange={handleEndDateChange} />
          </div>
        </div>
        <div className="meeting-requests-table" style={{ maxHeight: "350px", overflowY: "auto" }}>
          <table className='table table-hover shadow p-1 mb-4 bg-body rounded' style={{ fontSize: "14px" }}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeetingRequests.map((meetingRequest) => (
                <tr key={meetingRequest.id} style={{ backgroundColor: getStatusColor(meetingRequest.status) }}>
                  <td>{meetingRequest.fullName}</td>
                  <td>{meetingRequest.reason}</td>
                  <td>{meetingRequest.meetingDate}</td>
                  <td>{meetingRequest.meetingTime}</td>
                  <td>{meetingRequest.technicianName}</td>
                  <td>
                    <div className="status" style={{ backgroundColor: getStatusColor(meetingRequest.status)}}>
                       {meetingRequest.status}
                    </div>
                   </td>
                  <td>
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#8B322C', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleCancelMeeting(meetingRequest.id)} />
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleAcceptMeeting(meetingRequest.id)} />
                    <FontAwesomeIcon icon={faEdit} style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleEditMeeting(meetingRequest)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing meeting */}
      {isModalOpen && editedMeeting && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Meeting</h5>
                <button type="button" className="close" aria-label="Close" style={{marginLeft:'300px'}} onClick={() => setIsModalOpen(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Date:</label>
                  <input type="date" className="form-control" value={editedMeeting.meetingDate} onChange={(e) => setEditedMeeting({ ...editedMeeting, meetingDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Time:</label>
                  <input type="time" className="form-control" value={editedMeeting.meetingTime} onChange={(e) => setEditedMeeting({ ...editedMeeting, meetingTime: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{backgroundColor:'grey', width:'200px', paddingTop:'2px'}} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" style={{backgroundColor:'#8B322C', borderColor:'#8B322C', width:'200px', marginRight:'30px', paddingTop:'2px'}} onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingRequestsList;
