import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const MeetingRequestsList = () => {
  const [meetingRequests, setMeetingRequests] = useState([]);

  useEffect(() => {
    fetchMeetingRequests();
  }, []);

  const fetchMeetingRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'MeetingRequests'));
      const meetingRequestsList = [];
      for (const doc of querySnapshot.docs) {
        const meetingRequestData = doc.data();
        // Fetch technician's name based on technicianId
        const technicianDoc = await getDoc(doc(db, 'technicians', meetingRequestData.technicianId));
        const technicianData = technicianDoc.data();
        const meetingRequestWithTechnicianName = {
          id: doc.id,
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

  return (
    <div className="container mt-4">
      <div className="meeting-requests-list-container">
        {/* Meeting requests list */}
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
          <table className='table table-hover shadow p-1 mb-4 bg-body rounded' style={{ fontSize: "14px" }}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Technician Name</th>
              </tr>
            </thead>
            <tbody>
              {meetingRequests.map((meetingRequest) => (
                <tr key={meetingRequest.id}>
                  <td>{meetingRequest.fullName}</td>
                  <td>{meetingRequest.reason}</td>
                  <td>{meetingRequest.meetingDate}</td>
                  <td>{meetingRequest.meetingTime}</td>
                  <td>{meetingRequest.status}</td>
                  <td>{meetingRequest.technicianName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeetingRequestsList;
